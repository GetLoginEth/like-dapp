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
    Route
} from "react-router-dom";
import Template from "./Template";
import ResourceView from "./resource/ResourceView";
import Authorize from "./Authorize";
import Dashboard from "./Dashboard";
import LoginTemplate from "./LoginTemplate";

function App() {
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [resources, setResources] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    function updateResources() {
        setIsResourcesLoading(true);
        setResources([{title: "Resource one", id: 1}, {title: "Resource two", id: 2},]);
        setTimeout(_ => setIsResourcesLoading(false), 2000)
    }

    const CurrentSwitch = <Switch>
        {/*<Route path="/about">
                        <About />
                    </Route>*/}
        <Route path="/resource/view/:id">
            <ResourceView/>
        </Route>
        {/*<Resources isLoading={isResourcesLoading} resources={resources}
                               onUpdate={updateResources}/>*/}
        <Route path="/">
            <Dashboard isLoading={isResourcesLoading} resources={resources}
                       onUpdate={updateResources}/>
        </Route>
    </Switch>;
    const CurrentTemplate = userInfo ? <Template
            onLogout={_ => {
                console.log('logout here');
                setUserInfo(null);
            }}
            isResourcesLoading={isResourcesLoading}
            updateResources={updateResources}
            resources={resources}
        >
            {CurrentSwitch}
        </Template>
        :
        <LoginTemplate onUserInfo={data => setUserInfo(data)}/>;


    return (
        <Router>
            {CurrentTemplate}
        </Router>
    );
}

export default App;
