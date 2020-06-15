import React, {useContext, useState} from 'react';
import './Resource.css';
import {actionCreateResource} from "../reducer/actions";
import WaitButton from "../WaitButton";
import {ContextApp} from "../reducer/reducer";
import ResourceForm from "./ResourceForm";

function ResourceCreate() {
    const {state: {inProcess}} = useContext(ContextApp);
    const {state: {user: {usernameHash}}} = useContext(ContextApp);

    /* const [title, setTitle] = useState('');
     const [url, setUrl] = useState('');
     const [description, setDescription] = useState('');*/

    return (
        <div className="ResourceCreate">
            <h6 className="mb-4">
                A resource is your site for which you want to collect advanced statistics on likes. You can view
                statistics for each page and for the whole site as a whole.
            </h6>
            <ResourceForm inProcess={inProcess} onSubmit={async ({id, title, url, description}) => {
                const result = await actionCreateResource(usernameHash, title, url, description)
                if (result) {
                    return 'reset';
                }
            }}/>
        </div>
    );
}

export default ResourceCreate;
