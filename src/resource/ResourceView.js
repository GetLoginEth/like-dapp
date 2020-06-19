import React, {Fragment, useContext, useEffect, useState} from 'react';
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

    const [isEdit, setIsEdit] = useState(false);

    const id = Number(match.params.id);
    const resource = resources.find(item => Number(item.id) === id);

    useEffect(_ => {
        // todo update info about likes
        setIsEdit(false);
    }, [id]);

    return (
        <div className="ResourceView">
            {(!resource || !resource.isLoadedInfo) && <Spinner/>}

            {resource && resource.isLoadedInfo &&
            <Fragment>
                <h3>{resource.title} <i style={{cursor: 'pointer'}}
                                        onClick={_ => setIsEdit(!isEdit)}
                                        className={`fa ${isEdit ? 'fa-angle-up' : 'fa-angle-down'}`}/>
                </h3>

                {(isEdit ? <ResourceForm
                        key={resource.id}
                        id={resource.id}
                        title={resource.title}
                        url={resource.url}
                        description={resource.description}
                        readOnly={true}
                        inProcess={inProcess}
                        onSubmit={async ({id, title, url, description}) => {
                            await actionEditResource(usernameHash, id, title, url, description)
                        }}/> :
                    <Fragment>

                        <p>ID: {resource.id}</p>
                        <p>Likes: {resource.reactions}</p>
                        <p>Donates: {resource.donates}</p>
                    </Fragment>)}
            </Fragment>
            }
        </div>
    );
};
