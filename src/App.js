import React, {useEffect, useReducer, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import './css/sb-admin-2.min.css';
import './js/sb-admin-2.js';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainTemplate from "./MainTemplate";
import LoginTemplate from "./LoginTemplate";
import {ContextApp, initialState, reducer} from "./reducer/reducer";
import {actionSetUserInfo, setDispatch} from "./reducer/actions";
import GetLoginInit, {STATUS_LOGIN_AUTH_REQUIRED, STATUS_LOGIN_SUCCESS} from "./GetLoginInit";
import LikeContract from "./like/LikeContract";

function NoMatch() {
    return (
        <div>
            <h3>
                Page not found
            </h3>

            <p>Correct path is https://swarm-gateways.net/bzz:/somehash/</p>
        </div>
    );
}

function PrivateRoute({children, isLogged, ...rest}) {
    const {computedMatch} = {...rest};
    const renderItem = (location) => isLogged ?
        children
        : (
            <Redirect
                to={{
                    pathname: `${computedMatch.url}/login`,
                    state: {from: location}
                }}
            />
        );

    return <Route {...rest} render={({location}) => renderItem(location)}/>;
}

function getIsLogged() {
    const accessToken = getAccessToken();
    return !!accessToken;
}

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function setAccessToken(accessToken) {
    if (accessToken) {
        localStorage.setItem('access_token', accessToken);
    } else {
        localStorage.removeItem('access_token');
    }
}

let likeContract = LikeContract.getInstance();

function App() {
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [resources, setResources] = useState(null);
    const [getLoginStatus, setGetLoginStatus] = useState(null);
    const [getLoginData, setGetLoginData] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    setDispatch(dispatch);
    let getLoginInit = null;
    const appId = 3;

    useEffect(_ => {
        if (getIsLogged()) {
            setIsLogged(true);
        }

        const urlAccessToken = GetLoginInit.checkAccessTokenInUrl();
        if (urlAccessToken) {
            setAccessToken(urlAccessToken);
        }

        const params = {appId, accessToken: getAccessToken()};
        //console.log(params);
        getLoginInit = new GetLoginInit(params);
        getLoginInit.onStatusChanged = async (status, data, getLoginInstance) => {
            console.log('onStatusChanged', status, data);
            setGetLoginStatus(status);
            setGetLoginData(data);

            if (status === STATUS_LOGIN_SUCCESS) {
                setAccessToken(data.data.access_token);
                if (getLoginInstance) {
                    const logicAddress = await getLoginInit.getAppLogicAddress({
                        storageAddress: likeContract.likeStorageAddress,
                        storageAbi: likeContract.likeStorageAbi,
                        logicAbi: likeContract.likeLogicAbi
                    });

                    likeContract.setLikeLogicAddress(logicAddress);
                    likeContract.setGetLoginInstance(getLoginInstance);
                    actionSetUserInfo(data.userInfo);
                }
            } else if (status === STATUS_LOGIN_AUTH_REQUIRED) {
                setAccessToken(null);
                setIsLogged(false);
            }
        };
        setGetLoginStatus(getLoginInit.currentStatus);
        getLoginInit.loadScript();
    }, []);

    function onLogout() {
        setAccessToken(null);
        //setUserInfo(null);
        window.location.replace('');
    }

    function updateResources() {
        setIsResourcesLoading(true);
        setResources([{title: "Resource one", id: 1}, {title: "Resource two", id: 2},]);
        setTimeout(_ => setIsResourcesLoading(false), 2000);
    }

    return (
        <ContextApp.Provider value={{dispatch, state}}>
            <Router>
                <Switch>
                    <Route path="/:swarm_protocol/:swarm_hash/login" render={params => {
                        const {match} = params;
                        console.log(params);
                        return (getIsLogged() || isLogged) ?
                            <Redirect to={`/${match.params.swarm_protocol}/${match.params.swarm_hash}`}/> :
                            <LoginTemplate getLoginStatus={getLoginStatus} getLoginData={getLoginData}/>;
                    }}>
                    </Route>

                    <PrivateRoute isLogged={(getIsLogged() || isLogged)} path="/:swarm_protocol/:swarm_hash">
                        <MainTemplate
                            onLogout={onLogout}
                            isResourcesLoading={isResourcesLoading}
                            updateResources={updateResources}
                            resources={resources}
                        />
                    </PrivateRoute>

                    <Route path="*">
                        <NoMatch/>
                    </Route>
                </Switch>
            </Router>
        </ContextApp.Provider>
    );
}

export default App;
