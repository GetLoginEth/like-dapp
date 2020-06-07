import React, {Fragment, useEffect, useState} from 'react';
import icon from './img/icon.png';

export default function LoginTemplate({onUserInfo}) {
    const abi = [];
    const [status, setStatus] = useState('loading');
    const [authorizeUrl, setAuthorizeUrl] = useState(null);
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [error, setError] = useState('');
    const [isWorking, setIsWorking] = useState(false);
    const [isNotesLoading, setIsNotesLoading] = useState(false);

    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    const appId = 3;
    let appUrl, scriptUrl;
    if (isDev) {
        scriptUrl = "https://localhost:3000/api/last.js";
        appUrl = 'https://localhost:3000/bzz:/getlogin.eth/';
    } else {
        scriptUrl = "https://swarm-gateways.net/bzz:/getlogin.eth/api/last.js";
        appUrl = 'https://swarm-gateways.net/bzz:/getlogin.eth/';
    }

    const getDefaultUri = () => {
        return window.location.href.replace(window.location.hash, '').replace('#', '');
    };

    const setAccessToken = token => {
        localStorage.setItem('access_token', token);
    };

    const getAccessToken = () => {
        return localStorage.getItem('access_token');
    };

    const init = async () => {
        window.getLoginApi.setClientAbi(abi);
        window.getLoginApi.setOnLogout(_ => {
            setStatus('authorize');
            setUser(null);
            setAccessToken(null);
            window.location.replace('./');
        });


        const data = await window.getLoginApi.init(appId, appUrl, getDefaultUri(), getAccessToken());
        console.log(data);
        if (!data.result) {
            alert('Error: not initialized');
            return;
        }

        setAuthorizeUrl(data.data.authorize_url);
        if (data.data.is_client_allowed) {
            setStatus('authorized');
            //setAccessToken(data.data.access_token);
            const userInfo = await window.getLoginApi.getUserInfo();
            setUser(userInfo);
            //updateNotes(userInfo.usernameHash);
            onUserInfo(userInfo);
        } else {
            setStatus('authorize');
        }

    };

    useEffect(_ => {
        window.document.querySelector('body').classList.add('bg-gradient-primary');

        window._onGetLoginApiLoaded = instance => {
            window.getLoginApi = instance;
            init();

        };
        const urlAccessToken = (new URLSearchParams(window.location.hash.replace('#', ''))).get('access_token');
        if (urlAccessToken) {
            window.location.replace('');
            setAccessToken(urlAccessToken);
        }

        const s = window.document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = scriptUrl;
        window.document.head.appendChild(s);

        return _ => {
            window.document.querySelector('body').classList.remove('bg-gradient-primary');
        };
    }, []);

    return <Fragment>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-4">
                                        {/*<div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>*/}

                                        <div className="card mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">GetLogin auth</h6>
                                            </div>
                                            <div className="card-body">
                                                <div className="pt-4">
                                                    <div className="chartjs-size-monitor">
                                                        <div className="chartjs-size-monitor-expand">
                                                            <div className=""></div>
                                                        </div>
                                                        <div className="chartjs-size-monitor-shrink">
                                                            <div className=""></div>
                                                        </div>
                                                    </div>
                                                    <p>Using this site, you can implement crypto-likes for your site,
                                                        see statistics on the number of actions on the entire site and
                                                        on each site resource.</p>
                                                    <p>To manage resources, you must be registered with GetLogin.</p>
                                                    <p>Information about GetLogin project and receiving invites for
                                                        registration you can find on <a
                                                            href="https://github.com/GetLoginEth/login" target="_blank">Github
                                                            repo</a>.</p>
                                                </div>

                                            </div>
                                        </div>

                                        <form className="user">
                                            {/*<div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                       id="exampleInputEmail" aria-describedby="emailHelp"
                                                       placeholder="Enter Email Address..."/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                       id="exampleInputPassword" placeholder="Password"/>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input"
                                                           id="customCheck"/>
                                                    <label className="custom-control-label" htmlFor="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>*/}

                                            <a href={authorizeUrl} disabled={status !== 'authorized'} onClick={e => {
                                                //e.preventDefault();
                                                //onUserInfo({});
                                            }} className="btn btn-primary btn-user btn-block">
                                                Login
                                            </a>
                                            {/*<hr/>
                                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Login with Google
                                            </a>
                                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </a>*/}
                                        </form>
                                        {/*<hr/>
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="register.html">Create an Account!</a>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>;
};
