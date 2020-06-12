export default class LikeContract {
    static instance = null;
    getLoginInstance = null;
    likeStorageAddress = '0x6A7c14bD5384e2eb8515a5B7298cF1ec5d63aD59';
    // todo move to global settings shared with other apps
    likeLogicAddress = null;
    // todo move to global settings shared with other apps
    likeStorageAbi = [
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
    likeLogicAbi = [
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

    /**
     *
     * @returns LikeContract
     */
    static getInstance() {
        if (!LikeContract.instance) {
            LikeContract.instance = new LikeContract();
        }

        return LikeContract.instance;
    }

    setLikeLogicAddress(address) {
        this.likeLogicAddress = address;
    }

    setGetLoginInstance(instance) {
        this.getLoginInstance = instance;
    }

    isReady() {
        return !!this.getLoginInstance;
    }

    checkIsReady() {
        if (!this.isReady()) {
            throw new Error('getLoginInstance is not ready');
        }
    }

    async createResourceType(title, url, description) {
        this.checkIsReady();
        return this.getLoginInstance.sendTransaction(this.likeLogicAddress, 'createResourceType', [title, description, url], {resolveMethod: 'mined'})
    }

    async getResourcesType() {
        this.checkIsReady();
        // todo check is implemented receiving list of resources type - implement
    }
}
