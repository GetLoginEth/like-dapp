import React, {Fragment, useContext, useEffect, useState} from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";
import {ContextApp} from "../reducer/reducer";
import Spinner from "../Spinner";
import {actionEditResource, actionGetLikes} from "../reducer/actions";
import ResourceForm from "./ResourceForm";
import WaitButton from "../WaitButton";

export default function ResourceView() {
    const match = useRouteMatch();
    const {state: {inProcess}} = useContext(ContextApp);
    const {state: {resources}} = useContext(ContextApp);
    const {state: {likes}} = useContext(ContextApp);
    const {state: {user: {usernameHash}}} = useContext(ContextApp);

    const [isEdit, setIsEdit] = useState(false);
    const [isLoadLikes, setIsLoadLikes] = useState(false);

    const id = Number(match.params.id);
    const resource = resources.find(item => Number(item.id) === id);
    const resourceLikes = likes[id];

    useEffect(_ => {
        setIsEdit(false);
    }, [id]);

    return (
        <div className="ResourceView">
            {(!resource || !resource.isLoadedInfo) && <Spinner/>}

            {resource && resource.isLoadedInfo &&
            <Fragment>
                <h1>{resource.title} <i style={{cursor: 'pointer'}}
                                        onClick={_ => setIsEdit(!isEdit)}
                                        className={`fa ${isEdit ? 'fa-angle-up' : 'fa-angle-down'}`}/>
                </h1>

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

                {!isEdit && <WaitButton disabled={isLoadLikes}>
                    <button disabled={resource.reactions <= 0} className="btn btn-primary" onClick={_ => {
                        setIsLoadLikes(true);
                        actionGetLikes(resource.id)
                            .then(_ => setIsLoadLikes(false));
                    }}>
                        Fetch likes
                    </button>
                </WaitButton>}

                {!isEdit && <div className="mt-3">
                    {resourceLikes && resourceLikes.map((item, i) => <p key={i}>
                        <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${item.raw.transactionHash}`}>
                            {item.resourceIdHash}
                        </a>
                    </p>)}
                </div>}
            </Fragment>
            }
        </div>
    );
};
