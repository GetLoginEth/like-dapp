import React, {useState} from 'react';
import './App.css';
import Resources from "./resource/Resources";

function App() {
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [resource, setResources] = useState(null);

    function updateResources() {
        setResources([11, 22, 33, 44]);
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

            </header>

            <Resources isLoading={isResourcesLoading} resources={resource} onUpdate={updateResources}/>
        </div>
    );
}

export default App;
