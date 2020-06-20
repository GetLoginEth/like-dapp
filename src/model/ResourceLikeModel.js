export default class ResourceLikeModel {
    resourceIdHash;
    resourceType;
    raw;
    isLoadedInfo = false;

    constructor(data = {}) {
        this.update(data);
    }

    update(data = {}) {
        Object.assign(this, data);
    }

    /**
     *
     * @param data
     * @returns ResourceLikeModel[]
     */
    static parseTxData(data) {
        return data.map(item => {
            const {resourceType, resourceIdHash} = item.returnValues;
            return new ResourceLikeModel({resourceType, resourceIdHash, raw: item});
        });
    }
}
