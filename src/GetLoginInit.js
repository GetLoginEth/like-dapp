export const STATUS_WAIT = 'getlogin_wait';
export const STATUS_LOADING = 'getlogin_loading';
export const STATUS_LOGIN_SUCCESS = 'getlogin_login_success';
export const STATUS_LOGIN_AUTH_REQUIRED = 'getlogin_login_auth_required';

export default class GetLoginInit {
    appId = null;
    isDev = false;
    scriptUrl = null;
    appUrl = null;
    instance = null;
    abi = [];
    returnUrl = null;
    accessToken = null;
    currentStatus = STATUS_WAIT;
    onStatusChanged = null;

    constructor({appId, scriptUrl, appUrl, devScriptUrl, devAppUrl, returnUrl, abi = [], accessToken = null}) {
        this.appId = appId;
        this.abi = abi;
        this.returnUrl = returnUrl || this.getReturnUri();
        this.accessToken = accessToken;
        this.isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (this.isDev) {
            this.scriptUrl = devScriptUrl || 'https://getlogin.localhost:3000/api/last.js';
            this.appUrl = devAppUrl || 'https://getlogin.localhost:3000/';
        } else {
            this.scriptUrl = scriptUrl || 'https://getlogin.swarm-gateways.net/api/last.js';
            this.appUrl = appUrl || 'https://getlogin.swarm-gateways.net/';
        }

        window._onGetLoginApiLoaded = instance => {
            this.instance = instance;
            this.init(instance);
        };
    }

    changeStatus(status, data = {}) {
        this.currentStatus = status;
        if (this.onStatusChanged) {
            this.onStatusChanged(status, data, this.instance);
        }
    }

    loadScript() {
        this.changeStatus(STATUS_LOADING);
        const s = window.document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = this.scriptUrl;
        window.document.head.appendChild(s);
    }

    getReturnUri() {
        return window.location.href.replace(window.location.hash, '').replace('#', '');
    };

    static checkAccessTokenInUrl() {
        const urlAccessToken = (new URLSearchParams(window.location.hash.replace('#', ''))).get('access_token');
        if (urlAccessToken) {
            return urlAccessToken;
        }

        return null;
    }

    async getAppLogicAddress({storageAddress, storageAbi, logicAbi, field = 'logicAddress'}) {
        this.instance.setClientAbi(storageAbi);
        const likeLogicAddress = await this.instance.callContractMethod(storageAddress, field);
        this.instance.setClientAbi(logicAbi);

        return likeLogicAddress;
    }

    async init(instance) {
        const data = await instance.init(this.appId, this.appUrl, this.returnUrl, this.accessToken);
        console.log(data);
        if (!data.result) {
            return;
        }

        if (data.data.is_client_allowed) {
            const userInfo = await instance.getUserInfo();
            this.changeStatus(STATUS_LOGIN_SUCCESS, {userInfo, data: data.data});
        } else {
            this.changeStatus(STATUS_LOGIN_AUTH_REQUIRED, {data: data.data});
        }
    }
}
