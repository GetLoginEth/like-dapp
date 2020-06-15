import React, {useContext, useState} from 'react';
import './Resource.css';
import {actionCreateResource} from "../reducer/actions";
import WaitButton from "../WaitButton";
import {ContextApp} from "../reducer/reducer";

function ResourceCreate() {
    const {state: {inProcess}} = useContext(ContextApp);
    const {state: {user: {usernameHash}}} = useContext(ContextApp);

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="ResourceCreate col-lg-9 col-xl-6">
            <h6 className="mb-4">
                A resource is your site for which you want to collect advanced statistics on likes. You can view
                statistics for each page and for the whole site as a whole.
            </h6>
            <form id="create-form" className="disabled" onSubmit={e => {
                e.preventDefault();
                actionCreateResource(usernameHash, title, url, description)
                    .then(result => {
                        if (result) {
                            setTitle('');
                            setDescription('');
                            setUrl('');
                        }
                    });
            }}>
                <fieldset disabled={inProcess}>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-user" placeholder="Title" value={title}
                               onChange={e => setTitle(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control form-control-user" placeholder="URL" value={url}
                               onChange={e => setUrl(e.target.value)}/>
                    </div>

                    <div className="form-group">
                    <textarea className="form-control " placeholder="Description" value={description}
                              onChange={e => setDescription(e.target.value)}/>
                    </div>

                    <WaitButton disabled={inProcess}>
                        <button className="btn btn-primary btn-user btn-block">
                            Create Resource
                        </button>
                    </WaitButton>
                </fieldset>
            </form>
        </div>
    );
}

export default ResourceCreate;
