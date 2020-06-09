import React, {useEffect, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import './css/sb-admin-2.min.css';
import './js/sb-admin-2.js';
import Resources from "./resource/Resources";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect, useHistory
} from "react-router-dom";
import MainTemplate from "./MainTemplate";
import ResourceView from "./resource/ResourceView";
import Authorize from "./Authorize";
import Dashboard from "./Dashboard";
import LoginTemplate from "./LoginTemplate";

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

function App() {
    const [isResourcesLoading, setIsResourcesLoading] = useState(false);
    const [resources, setResources] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [getLoginInstance, setGetLoginInstance] = useState(null);
    const history = useHistory();

    useEffect(_ => {
        updateResources();

        const token = localStorage.getItem('access_token');
        if (token) {
            onAuthorized(token);
        }
    }, []);

    function onLogout() {
        localStorage.removeItem('access_token');
        setAccessToken(null);
        setUserInfo(null);
    }

    function onAuthorized(accessToken, data) {
        localStorage.setItem('access_token', accessToken);
        setAccessToken(accessToken);
        setUserInfo(data);
    }

    function updateResources() {
        setIsResourcesLoading(true);
        setResources([{title: "Resource one", id: 1}, {title: "Resource two", id: 2},]);
        setTimeout(_ => setIsResourcesLoading(false), 2000);
    }

    function isLogged() {
        const accessToken = localStorage.getItem('access_token');
        return !!accessToken;
    }

    function PrivateRoute({children, ...rest}) {
        const {computedMatch} = {...rest};
        const renderItem = (location) => isLogged() ?
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

    return (
        <Router>
            <Switch>
                <Route path="/:swarm_protocol/:swarm_hash/login" render={params => {
                    const {match} = params;
                    console.log(params);
                    return isLogged() ? <Redirect to={`/${match.params.swarm_protocol}/${match.params.swarm_hash}`}/> :
                        <LoginTemplate onAuthorized={onAuthorized}/>;
                }}>
                </Route>

                <PrivateRoute path="/:swarm_protocol/:swarm_hash">
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
    );
}

export default App;
