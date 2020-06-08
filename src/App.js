import React, {useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import './css/sb-admin-2.min.css';
import './js/sb-admin-2.js';
import Resources from "./resource/Resources";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect, useHistory
} from "react-router-dom";
import MainTemplate from "./MainTemplate";
import ResourceView from "./resource/ResourceView";
import Authorize from "./Authorize";
import Dashboard from "./Dashboard";
import LoginTemplate from "./LoginTemplate";

function App() {
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [resources, setResources] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const history = useHistory();

    function updateResources() {
        setIsResourcesLoading(true);
        setResources([{title: "Resource one", id: 1}, {title: "Resource two", id: 2},]);
        setTimeout(_ => setIsResourcesLoading(false), 2000)
    }

    const LoginRoute = ({path, children}) => {
        return userInfo ? <Redirect to={{pathname: "./"}}/> : <Route path={path}>
            {children}
        </Route>;
    };

    return (
        <Router>
            <Switch>
                <Route path="/:swarm_protocol/:swarm_hash/login">
                    <LoginTemplate onUserInfo={data => setUserInfo(data)}/>
                </Route>

                <Route path="/:swarm_protocol/:swarm_hash">
                    <MainTemplate
                        onLogout={_ => {
                            console.log('logout here');
                            setUserInfo(null);
                        }}
                        isResourcesLoading={isResourcesLoading}
                        updateResources={updateResources}
                        resources={resources}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
