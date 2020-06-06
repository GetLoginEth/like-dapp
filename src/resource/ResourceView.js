import React from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";

function ResourceView() {
    const match = useRouteMatch();
    console.log(match);

    return (
        <div className="ResourceView">
            <header className="App-header">
                <p>
                    Resource view id {match.params.id}
                </p>
                <a href="https://reactjs.org">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default ResourceView;
