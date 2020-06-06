import React, {useState} from 'react';
import jquery from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
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

function App() {
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [resources, setResources] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    function updateResources() {
        setIsResourcesLoading(true);
        setResources([{title: "Resource one", id: 1}, {title: "Resource two", id: 2},]);
        setTimeout(_ => setIsResourcesLoading(false), 2000)
    }

    return (
        <Router>
            <Template
                onLogout={_ => {
                    console.log('logout here');
                    setUserInfo(null);
                }}
                isResourcesLoading={isResourcesLoading}
                updateResources={updateResources}
                resources={resources}>
                <Switch>
                    {/*<Route path="/about">
                        <About />
                    </Route>*/}
                    <Route path="/resource/view/:id">
                        <ResourceView/>
                    </Route>
                    {/*<Resources isLoading={isResourcesLoading} resources={resources}
                               onUpdate={updateResources}/>*/}
                    <Route path="/">
                        {userInfo ?
                            <Dashboard isLoading={isResourcesLoading} resources={resources}
                                       onUpdate={updateResources}/> :
                            <Authorize onUserInfo={data => setUserInfo(data)}/>}
                    </Route>
                </Switch>
            </Template>

        </Router>
    );
}

export default App;
