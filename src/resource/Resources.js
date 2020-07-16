import React, {useEffect} from 'react';
import './Resource.css';
import {Link} from "react-router-dom";

function Resources({resources, onUpdate, isLoading}) {
    useEffect(_ => {
        onUpdate();
    }, []);

    return (
        <div className="Resources">
            <header className="App-header">
                <p>
                    User Resources
                </p>
            </header>

            {!resources && isLoading && <div>Loading...</div>}

            {resources && resources.map((item, i) => {
                return <p key={i}>
                    <Link to={`/resource/view/${item}`}>{item}</Link>
                </p>;
            })}
        </div>
    );
}

export default Resources;
