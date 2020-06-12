import React, {useState} from 'react';
import './Resource.css';
import {useRouteMatch} from "react-router-dom";
import {actionCreateResource} from "../reducer/actions";

function ResourceCreate() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const match = useRouteMatch();

    return (
        <div className="ResourceCreate">
            <h6 className="mb-4">
                A resource is your site for which you want to collect advanced statistics on likes. You can view
                statistics for each page and for the whole site as a whole.
            </h6>
            <form onSubmit={e => {
                e.preventDefault();
                actionCreateResource(title, url, description);
            }}>
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

                <button className="btn btn-primary btn-user btn-block">
                    Create Resource
                </button>
            </form>
        </div>
    );
}

export default ResourceCreate;
