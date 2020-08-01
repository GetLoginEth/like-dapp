import React, {Fragment, useEffect, useState} from 'react';
import icon from './img/icon.png';
import {STATUS_LOADING, STATUS_LOGIN_AUTH_REQUIRED} from "./GetLoginInit";
import Spinner from "./Spinner";

export default function LoginTemplate({getLoginStatus, getLoginData}) {
    useEffect(_ => {
        window.document.querySelector('body').classList.add('bg-gradient-primary');

        return _ => {
            window.document.querySelector('body').classList.remove('bg-gradient-primary');
        };
    }, []);

    const isDisabledLoginButton = getLoginStatus !== STATUS_LOGIN_AUTH_REQUIRED;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"/>
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
                                                            <div className=""/>
                                                        </div>
                                                        <div className="chartjs-size-monitor-shrink">
                                                            <div className=""/>
                                                        </div>
                                                    </div>
                                                    <p>Using this site, you can implement crypto-likes for your
                                                        site,
                                                        see statistics on the number of actions on the entire site
                                                        and
                                                        on each site resource.</p>
                                                    <p>To manage resources, you must be registered in GetLogin.</p>
                                                    <p>Information about GetLogin project and receiving invites for
                                                        registration you can find on <a
                                                            href="https://github.com/GetLoginEth/login"
                                                            target="_blank">Github
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

                                            <a href={getLoginData && getLoginData.data ? getLoginData.data.authorize_url : '#'}
                                               onClick={e => {
                                                   //e.preventDefault();
                                                   //onUserInfo({});
                                               }}
                                               className={`btn btn-primary btn-user btn-block ${isDisabledLoginButton ? 'disabled' : ''}`}>
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
    );
};
