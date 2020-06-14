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
        return this.getLoginInstance.sendTransaction(this.likeLogicAddress, 'createResourceType', [title, description, url], {resolveMethod: 'mined'})
    }

    async getResourcesType() {
        this.checkIsReady();
        // todo check is implemented receiving list of resources type - implement
    }
}
