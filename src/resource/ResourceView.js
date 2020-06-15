import React, {Fragment, useContext} from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";
import {ContextApp} from "../reducer/reducer";
import Spinner from "../Spinner";
import {actionCreateResource} from "../reducer/actions";
import ResourceForm from "./ResourceForm";

export default function ResourceView() {
    const match = useRouteMatch();
    const {state: {resources}} = useContext(ContextApp);
    const id = Number(match.params.id);
    const resource = resources.find(item => Number(item.id) === id);

    return (
        <div className="ResourceView">
            {(!resource || !resource.isLoadedInfo) && <Spinner/>}

            {resource && resource.isLoadedInfo && <ResourceForm
                key={resource.id}
                id={resource.id}
                title={resource.title}
                url={resource.url}
                description={resource.description}
                readOnly={true}
                onSubmit={async ({id, title, url, description}) => {
                    alert('save here');
                    /*const result = await actionCreateResource(usernameHash, title, url, description)
                    if (result) {
                        return 'reset';
                    }*/
                }}/>}
        </div>
    );
};
