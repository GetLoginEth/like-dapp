import React from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";

function ResourceCreate() {
    const match = useRouteMatch();

    return (
        <div className="ResourceCreate">
            <header className="App-header">
                <p>
                    Resource create
                </p>

            </header>
        </div>
    );
}

export default ResourceCreate;
