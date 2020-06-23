import React from "react";

export const ContextApp = React.createContext();

export const initialState = {
    inProcess: false,
    error: '',

    resources: null,
    user: {
        username: null,
        usernameHash: null,
        avatar: null
    },
    likes: {}
};

export const reducer = (state, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case ACTION_SET_RESOURCES:
            return {
                ...state,
                resources: action.payload
            };
        case ACTION_CREATE_RESOURCE:
            return {
                ...state,
                resources: [...state.resources, action.payload]
            };
        case ACTION_GET_RESOURCE:
            return {
                ...state,
                resources: [...state.resources, action.payload]
            };
        case ACTION_UPDATE_RESOURCE:
            return {
                ...state,
                resources: state.resources.map(item => Number(item.id) === Number(action.payload.id) ? action.payload : item)
            };
        case ACTION_DELETE_RESOURCE:
            return {
                ...state,
                resources: state.resources.filter(item => Number(item.id) === Number(action.payload))
            };
        case ACTION_SET_IN_PROCESS:
            return {
                ...state,
                inProcess: action.payload
            };
        case ACTION_SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case ACTION_SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case ACTION_SET_LIKES:
            const resourceTypeId = action.payload.resourceTypeId;
            const data = action.payload.data;
            const resultData = {[resourceTypeId]: data};

            return {
                ...state,
                likes: {...state.likes, ...resultData}
            };
        default:
            return state
    }
};

export const ACTION_SET_RESOURCES = 'set_resources';
export const ACTION_SET_IN_PROCESS = 'set_in_process';
export const ACTION_SET_ERROR = 'set_error';
export const ACTION_SET_USER = 'set_user';
export const ACTION_SET_LIKES = 'set_likes';

export const ACTION_GET_RESOURCE = 'get_resource';

export const ACTION_UPDATE_RESOURCE = 'update_resource';
export const ACTION_DELETE_RESOURCE = 'delete_resource';
export const ACTION_CREATE_RESOURCE = 'create_resource';
