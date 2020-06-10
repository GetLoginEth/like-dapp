import React, {useContext} from "react";
import * as Names from "./reducer";
import {ContextApp} from "./reducer";

let dispatch = null;

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
