export default class ResourceTypeModel {
    id;
    usernameHash;
    raw;
    title;
    description;
    url;
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
     * @returns ResourceTypeModel[]
     */
    static parseTxData(data) {
        return data.map(item => {
            const {resourceType: id, usernameHash} = item.returnValues;
            return new ResourceTypeModel({id, usernameHash, raw: JSON.stringify(item)});
        });
    }
}
