import React, {Fragment, useContext, useState} from 'react';
import './Resource.css';

import Spinner from "../Spinner";
import {actionCreateResource} from "../reducer/actions";
import WaitButton from "../WaitButton";

export default function ResourceForm(params) {
    const {id, readOnly, inProcess, onSubmit} = params;
    const [title, setTitle] = useState(params.title ?? '');
    const [url, setUrl] = useState(params.url ?? '');
    const [description, setDescription] = useState(params.description ?? '');

    return (
        <form className="col-lg-9 col-xl-6" onSubmit={async e => {
            e.preventDefault();
            if (onSubmit) {
                const data = await onSubmit({id, title, url, description});
                if (data === 'reset') {
                    setTitle('');
                    setDescription('');
                    setUrl('');
                }
            }
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
                        Save Resource
                    </button>
                </WaitButton>
            </fieldset>
        </form>
    );
};
