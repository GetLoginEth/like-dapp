import storageInfo from '@getlogin/like/web/LikeStorageAbi.json'
import logicInfo from '@getlogin/like/web/LikeLogicAbi.json'

export default class LikeContract {
    static instance = null;
    getLoginInstance = null;
    likeStorageAddress = storageInfo.address;
    likeLogicAddress = null;
    likeStorageAbi = storageInfo.abi;
    likeLogicAbi = logicInfo.abi;

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
        this.getLoginInstance.setClientAbi(this.likeLogicAbi);
        return this.getLoginInstance.sendTransaction(this.likeLogicAddress, 'createResourceType', [title, description, url], {resolveMethod: 'mined'})
    }

    async editResourceType(id, title, url, description) {
        this.checkIsReady();
        this.getLoginInstance.setClientAbi(this.likeLogicAbi);
        return this.getLoginInstance.sendTransaction(this.likeLogicAddress, 'editResourceType', [id, title, description, url], {resolveMethod: 'mined'})
    }

    async getResourcesType(usernameHash) {
        this.checkIsReady();
        this.getLoginInstance.setClientAbi(this.likeStorageAbi);
        return this.getLoginInstance.getPastEvents(this.likeStorageAddress, 'EventResourceTypeCreated', {
            filter: {
                usernameHash,
            },
            fromBlock: 0
        });
    }

    async getLikes(resourceTypeId) {
        this.checkIsReady();
        this.getLoginInstance.setClientAbi(this.likeStorageAbi);
        return this.getLoginInstance.getPastEvents(this.likeStorageAddress, 'EventLikeResource', {
            filter: {
                resourceType: resourceTypeId,
            },
            fromBlock: 0
        });
    }

    async getResourceType(id) {
        this.getLoginInstance.setClientAbi(this.likeStorageAbi);
        return this.getLoginInstance.callContractMethod(this.likeStorageAddress, 'getResourceType', id);
    }
}
