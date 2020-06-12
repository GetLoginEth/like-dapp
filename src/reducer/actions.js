import React from "react";
import * as Names from "./reducer";
import LikeContract from "../like/LikeContract";

let dispatch = null;
let likeContractInstance = LikeContract.getInstance();

export function setDispatch(func) {
    dispatch = func;
}

export function actionUpdateResources() {
    dispatch({
        type: Names.ACTION_SET_RESOURCES, payload: [
            {title: "Resource one", id: 1},
            {title: "Resource two", id: 2},
            {title: "Resource three", id: 3},
            {title: "Resource four", id: 4}
        ]
    });
}

export function actionCreateResource(title, url, description) {
    dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: true});
    likeContractInstance.createResourceType(title, url, description)
        .then(tx => {
            console.log(tx.blockHash);
            dispatch({type: Names.ACTION_CREATE_RESOURCE, payload: {title, url, description}});
            dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: false});
        })
        .catch(e => dispatch({type: Names.ACTION_SET_ERROR, payload: e.message}));
}
