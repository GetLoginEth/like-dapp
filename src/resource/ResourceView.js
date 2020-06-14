import React, {Fragment, useContext} from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";
import {ContextApp} from "../reducer/reducer";
import Spinner from "../Spinner";

function ResourceView() {
    const match = useRouteMatch();
    const {state: {resources}} = useContext(ContextApp);
    const id = Number(match.params.id);
    const resource = resources.find(item => Number(item.id) === id);

    return (
        <div className="ResourceView">
            {!resource && <Spinner/>}

            {resource && <Fragment>
                <p>
                    Resource view id {id}
                </p>
                <p>{resource.title}</p>
                <p>{resource.url}</p>
                <p>{resource.description}</p>
            </Fragment>}
        </div>
    );
}

export default ResourceView;
