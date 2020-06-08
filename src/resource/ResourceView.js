import React from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";

function ResourceView() {
    const match = useRouteMatch();

    return (
        <div className="ResourceView">
            <header className="App-header">
                <p>
                    Resource view id {match.params.id}
                </p>

            </header>
        </div>
    );
}

export default ResourceView;
