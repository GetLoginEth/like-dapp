import React from "react";
import * as Names from "./reducer";
import LikeContract from "../like/LikeContract";
import ResourceTypeModel from "../model/ResourceTypeModel";

let dispatch = null;
let likeContractInstance = LikeContract.getInstance();

export function setDispatch(func) {
    dispatch = func;
}

export async function actionUpdateResources(usernameHash) {
    dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: true});
    try {
        const data = await likeContractInstance.getResourcesType(usernameHash)
        const payload = ResourceTypeModel.parseTxData(data);
        dispatch({type: Names.ACTION_SET_RESOURCES, payload});
        payload.forEach(item => {
            likeContractInstance.getResourceType(item.id)
                .then(({title, description, url, donates, reactions}) => {
                    item.update({title, description, url, donates, reactions});
                    item.isLoadedInfo = true;
                    dispatch({type: Names.ACTION_UPDATE_RESOURCE, payload: item});
                })
        })
    } catch (e) {
        dispatch({type: Names.ACTION_SET_ERROR, payload: e.message})
    }
}

export function actionSetUserInfo(payload) {
    dispatch({type: Names.ACTION_SET_USER, payload});
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
