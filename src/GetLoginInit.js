export default class GetLoginInit {
    appId = null;
    isDev = false;
    scriptUrl = null;
    appUrl = null;
    instance = null;
    abi = [];
    returnUrl = null;
    accessToken = null;

    constructor({appId, scriptUrl, appUrl, devScriptUrl, devAppUrl, returnUrl, abi = [], accessToken = null}) {
        this.appId = appId;
        this.abi = abi;
        this.returnUrl = returnUrl || this.getReturnUri();
        this.accessToken = accessToken;
        this.isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (this.isDev) {
            this.scriptUrl = devScriptUrl || 'https://localhost:3000/api/last.js';
            this.appUrl = devAppUrl || 'https://localhost:3000/bzz:/getlogin.eth/';
        } else {
            this.scriptUrl = scriptUrl || 'https://swarm-gateways.net/bzz:/getlogin.eth/api/last.js';
            this.appUrl = appUrl || 'https://swarm-gateways.net/bzz:/getlogin.eth/';
        }

        window._onGetLoginApiLoaded = instance => {
            this.instance = instance;
            init(instance);
        };

        const s = window.document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = this.scriptUrl;
        window.document.head.appendChild(s);
    }

    getReturnUri() {
        return window.location.href.replace(window.location.hash, '').replace('#', '');
    };

    async init(instance) {
        instance.setClientAbi(this.abi);
        /*instance.setOnLogout(_ => {
            setStatus('authorize');
            setUser(null);
            setAccessToken(null);
            //window.location.replace('./');
        });*/

        const data = await instance.init(this.appId, this.appUrl, this.returnUrl, this.accessToken);
        console.log(data);
        if (!data.result) {
            //alert('Error: not initialized');
            return;
        }

        //setAuthorizeUrl(data.data.authorize_url);
        if (data.data.is_client_allowed) {
            setStatus('authorized');
            //setAccessToken(data.data.access_token);
            const userInfo = await instance.getUserInfo();
            setUser(userInfo);
            //updateNotes(userInfo.usernameHash);
            onAuthorized(data.data.access_token, userInfo);
        } else {
            setStatus('authorize');
        }
    }
}
