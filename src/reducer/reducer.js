import React from "react";

export const ContextApp = React.createContext();

export const initialState = {
    resources: [],
    user: {
        username: null,
        usernameHash: null,
        avatar: null
    }
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_SET_RESOURCES:
            return {
                ...state,
                resources: action.payload
            };
        default:
            return state
    }
};

export const ACTION_SET_RESOURCES = 'set_resources';
