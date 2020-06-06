import React from 'react';

export default function Authorize({onUserInfo}) {
    return <div>
        <p>Authorize content here</p>
        <button onClick={_ => onUserInfo({userId: 1})} className="btn btn-primary">Auth</button>
    </div>
}
