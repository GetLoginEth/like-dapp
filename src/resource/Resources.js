import React, {useEffect} from 'react';
import './Resource.css';

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
                return <div key={i}>{item}</div>
            })}
        </div>
    );
}

export default Resources;
