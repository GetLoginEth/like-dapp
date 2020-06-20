import React from "react";
import * as Names from "./reducer";
import LikeContract from "../like/LikeContract";
import ResourceTypeModel from "../model/ResourceTypeModel";
import ResourceLikeModel from "../model/ResourceLikeModel";

let dispatch = null;
let likeContractInstance = LikeContract.getInstance();

export function setDispatch(func) {
    dispatch = func;
}

export async function actionUpdateResources(usernameHash) {
    //dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: true});
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
    //dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: false});
}

export function actionSetUserInfo(payload) {
    dispatch({type: Names.ACTION_SET_USER, payload});
}

export async function actionCreateResource(usernameHash, title, url, description) {
    let result = true;
    dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: true});
    const tx = await likeContractInstance.createResourceType(title, url, description)
    try {
        dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: false});
        await actionUpdateResources(usernameHash);
    } catch (e) {
        dispatch({type: Names.ACTION_SET_ERROR, payload: e.message});
        result = false;
    }

    dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: false});

    return result;
}

export async function actionEditResource(usernameHash, id, title, url, description) {
    let result = true;
    dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: true});
    const tx = await likeContractInstance.editResourceType(id, title, url, description)
    try {
        console.log(tx);
        dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: false});
        await actionUpdateResources(usernameHash);
    } catch (e) {
        dispatch({type: Names.ACTION_SET_ERROR, payload: e.message});
        result = false;
    }

    dispatch({type: Names.ACTION_SET_IN_PROCESS, payload: false});

    return result;
}

export async function actionGetLikes(resourceTypeId) {
    try {
        let data = await likeContractInstance.getLikes(resourceTypeId);
        data = ResourceLikeModel.parseTxData(data);
        dispatch({type: Names.ACTION_SET_LIKES, payload: {resourceTypeId, data}});
    } catch (e) {
        dispatch({type: Names.ACTION_SET_ERROR, payload: e.message})
    }
}
