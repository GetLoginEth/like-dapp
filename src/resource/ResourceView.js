import React, {useContext} from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";
import {ContextApp} from "../reducer/reducer";
import Spinner from "../Spinner";
import {actionEditResource} from "../reducer/actions";
import ResourceForm from "./ResourceForm";

export default function ResourceView() {
    const match = useRouteMatch();
    const {state: {inProcess}} = useContext(ContextApp);
    const {state: {resources}} = useContext(ContextApp);
    const {state: {user: {usernameHash}}} = useContext(ContextApp);

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
                inProcess={inProcess}
                onSubmit={async ({id, title, url, description}) => {
                    await actionEditResource(usernameHash, id, title, url, description)
                }}/>}
        </div>
    );
};
