import React, {useEffect, useReducer, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import './css/sb-admin-2.min.css';
import './js/sb-admin-2.js';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect, useHistory
} from "react-router-dom";
import MainTemplate from "./MainTemplate";
import LoginTemplate from "./LoginTemplate";
import {ContextApp, initialState, reducer} from "./reducer/reducer";
import {setDispatch} from "./reducer/actions";
import GetLoginInit, {STATUS_LOGIN_AUTH_REQUIRED, STATUS_LOGIN_SUCCESS} from "./GetLoginInit";

const likeStorageAddress = '0x6A7c14bD5384e2eb8515a5B7298cF1ec5d63aD59';
// todo move to global settings shared with other apps
const likeLogicAddress = null;
// todo move to global settings shared with other apps
const likeStorageAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "resourceType",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            }
        ],
        "name": "EventLikeResource",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            }
        ],
        "name": "EventLikeUrl",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "decrementResourceId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "resourceType",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            }
        ],
        "name": "emitEventLikeResource",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            }
        ],
        "name": "emitEventLikeUrl",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "key",
                "type": "bytes32"
            }
        ],
        "name": "getResourceIdStatistics",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "resourceTypeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "resourceIdHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "urlHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donates",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeStorage.ResourceIdStatistics",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "key",
                "type": "uint256"
            }
        ],
        "name": "getResourceType",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donates",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "ownerUsernameHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeStorage.ResourceType",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "key",
                "type": "bytes32"
            }
        ],
        "name": "getUserLike",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "incrementResourceId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "logicAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "newResourceId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "resourceIdStatistics",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "resourceTypeId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "reactions",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "donates",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "resources",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "reactions",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "donates",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "ownerUsernameHash",
                "type": "bytes32"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_logicAddress",
                "type": "address"
            }
        ],
        "name": "setLogicAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "key",
                "type": "bytes32"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "resourceTypeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "resourceIdHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "urlHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donates",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeStorage.ResourceIdStatistics",
                "name": "value",
                "type": "tuple"
            }
        ],
        "name": "setResourceIdStatistics",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "key",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donates",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "ownerUsernameHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeStorage.ResourceType",
                "name": "value",
                "type": "tuple"
            }
        ],
        "name": "setResourceType",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "key",
                "type": "bytes32"
            },
            {
                "internalType": "bool",
                "name": "value",
                "type": "bool"
            }
        ],
        "name": "setUserLike",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "userLike",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
// todo move to global settings shared with other apps
const likeLogicAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            }
        ],
        "name": "createResourceType",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "resourceTypeId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            },
            {
                "internalType": "address payable",
                "name": "donateAddress",
                "type": "address"
            }
        ],
        "name": "like",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            },
            {
                "internalType": "address payable",
                "name": "donateAddress",
                "type": "address"
            }
        ],
        "name": "likeUrl",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract GetLoginStorage",
                "name": "_storageAddress",
                "type": "address"
            }
        ],
        "name": "setGLStorage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract LikeStorage",
                "name": "_storageAddress",
                "type": "address"
            }
        ],
        "name": "setLikeStorage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract LikeStorage",
                "name": "_likeStorage",
                "type": "address"
            },
            {
                "internalType": "contract GetLoginStorage",
                "name": "_GLStorage",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "resourceTypeId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            }
        ],
        "name": "unlike",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            }
        ],
        "name": "unlikeUrl",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getGLUsernameHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "resourceTypeId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            }
        ],
        "name": "getResourceIdKey",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "resourceTypeId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            }
        ],
        "name": "getResourceIdStatistics",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "resourceTypeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "resourceIdHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "urlHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donates",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeStorage.ResourceIdStatistics",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            }
        ],
        "name": "getResourceIdStatisticsUrl",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "resourceTypeId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "resourceIdHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "urlHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donates",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeStorage.ResourceIdStatistics",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            }
        ],
        "name": "getUrlHashKey",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "usernameHash",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "resourceTypeId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "resourceIdHash",
                "type": "bytes32"
            }
        ],
        "name": "getUserLikeResourceKey",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "usernameHash",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            }
        ],
        "name": "getUserLikeUrlKey",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "usernameHash",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "urlHash",
                "type": "bytes32"
            }
        ],
        "name": "getUserStatisticsUrl",
        "outputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "resourceTypeId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "resourceIdHash",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "urlHash",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "uint256",
                                "name": "reactions",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "donates",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isActive",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct LikeStorage.ResourceIdStatistics",
                        "name": "resourceStatistics",
                        "type": "tuple"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "usernameHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "isLiked",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeLogic.UserStatistics",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "GLStorage",
        "outputs": [
            {
                "internalType": "contract GetLoginStorage",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "likeStorage",
        "outputs": [
            {
                "internalType": "contract LikeStorage",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "key",
                "type": "uint256"
            }
        ],
        "name": "validateGetResourceType",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "reactions",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "donates",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "ownerUsernameHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LikeStorage.ResourceType",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

function NoMatch() {
    return (
        <div>
            <h3>
                Page not found
            </h3>

            <p>Correct path is https://swarm-gateways.net/bzz:/somehash/</p>
        </div>
    );
}

function PrivateRoute({children, isLogged, ...rest}) {
    const {computedMatch} = {...rest};
    const renderItem = (location) => isLogged ?
        children
        : (
            <Redirect
                to={{
                    pathname: `${computedMatch.url}/login`,
                    state: {from: location}
                }}
            />
        );

    return <Route {...rest} render={({location}) => renderItem(location)}/>;
}

function getIsLogged() {
    const accessToken = getAccessToken();
    return !!accessToken;
}

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function setAccessToken(accessToken) {
    if (accessToken) {
        localStorage.setItem('access_token', accessToken);
    } else {
        localStorage.removeItem('access_token');
    }
}

function App() {
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [resources, setResources] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    //const [accessToken, setAccessToken] = useState(null);
    const [getLoginStatus, setGetLoginStatus] = useState(null);
    const [getLoginData, setGetLoginData] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);
    setDispatch(dispatch);
    let getLoginInit = null;
    const appId = 3;

    useEffect(_ => {
        console.log('Main useEffect');

        if (getIsLogged()) {
            setIsLogged(true);
        }

        const urlAccessToken = GetLoginInit.checkAccessTokenInUrl();
        if (urlAccessToken) {
            setAccessToken(urlAccessToken);
            //window.location.replace('');
            setIsLogged(true);
            return;
        }

        const params = {appId, accessToken: getAccessToken()};
        console.log(params);
        getLoginInit = new GetLoginInit(params);
        getLoginInit.onStatusChanged = (status, data) => {
            console.log(status, data);
            setGetLoginStatus(status);
            setGetLoginData(data);

            if (status === STATUS_LOGIN_SUCCESS) {
                setAccessToken(data.data.access_token);
            } else if (status === STATUS_LOGIN_AUTH_REQUIRED) {
                setAccessToken(null);
                setIsLogged(false);
            }
        };
        setGetLoginStatus(getLoginInit.currentStatus);
        getLoginInit.loadScript();
    }, []);

    function onLogout() {
        setAccessToken(null);
        //setUserInfo(null);
        window.location.replace('');
    }

    function updateResources() {
        setIsResourcesLoading(true);
        setResources([{title: "Resource one", id: 1}, {title: "Resource two", id: 2},]);
        setTimeout(_ => setIsResourcesLoading(false), 2000);
    }

    // todo check logged (and set to state) before app initialized or route init
    console.log('is logged', isLogged)
    return (
        <ContextApp.Provider value={{dispatch, state}}>
            <Router>
                <Switch>
                    <Route path="/:swarm_protocol/:swarm_hash/login" render={params => {
                        const {match} = params;
                        console.log(params);
                        return isLogged ?
                            <Redirect to={`/${match.params.swarm_protocol}/${match.params.swarm_hash}`}/> :
                            <LoginTemplate getLoginStatus={getLoginStatus} getLoginData={getLoginData}/>;
                    }}>
                    </Route>

                    <PrivateRoute isLogged={isLogged} path="/:swarm_protocol/:swarm_hash">
                        <MainTemplate
                            onLogout={onLogout}
                            isResourcesLoading={isResourcesLoading}
                            updateResources={updateResources}
                            resources={resources}
                        />
                    </PrivateRoute>

                    <Route path="*">
                        <NoMatch/>
                    </Route>
                </Switch>
            </Router>
        </ContextApp.Provider>
    );
}

export default App;
