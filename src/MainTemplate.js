import React, {Fragment, useContext, useEffect} from 'react';
import icon from './img/icon-512-white.png';
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Dashboard from "./Dashboard";
import ResourceView from "./resource/ResourceView";
import ResourceCreate from "./resource/ResourceCreate";
import {ContextApp} from "./reducer/reducer";
import {actionUpdateResources} from "./reducer/actions";
import userCircle from './img/user-circle.png';

export default function MainTemplate({onLogout,}) {
    let {path, url} = useRouteMatch();
    const match = useRouteMatch(path + '/:page?/:action?/:id?');
    const {state: {resources}} = useContext(ContextApp);
    const {state: {user: {username}}} = useContext(ContextApp);
    const {state: {user: {usernameHash}}} = useContext(ContextApp);

    const currentPage = match.params.page;
    const currentAction = match.params.action;
    const currentId = match.params.id;

    useEffect(_ => {
        if (usernameHash) {
            actionUpdateResources(usernameHash);
        }
    }, [usernameHash]);

    return <Fragment>
        <div id="wrapper">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to={`${url}`}>
                    <div className="sidebar-brand-icon">
                        {/*<i className="fas fa-laugh-wink"></i>*/}
                        <img className={"MainTemplate-icon"} src={icon} alt=""/>
                    </div>
                    <div className="sidebar-brand-text mx-3">Like</div>
                </Link>

                <hr className="sidebar-divider my-0"/>

                <li className={`nav-item ${!currentPage ? 'active' : ''}`}>
                    <Link className="nav-link" to={`${url}`}>
                        <i className="fas fa-fw fa-tachometer-alt"/>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider"/>

                {/*<div className="sidebar-heading">
                    Interface
                </div>*/}

                <li className={`nav-item ${currentPage === 'resource' ? 'active' : ''}`}>
                    <a className="nav-link collapsed" href="#a" data-toggle="collapse" data-target="#collapseTwo"
                       aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"/>
                        <span>Resources</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link to={`${url}/resource/create`} className="collapse-header">
                                <i className="fas fa-plus"/> Create resource
                            </Link>
                            {resources && resources.map((item, i) => {
                                const isActive = (currentAction === 'view' && Number(currentId) === Number(item.id));
                                const classes = `collapse-item ${isActive ? 'active' : ''}`;
                                const longText = item.isLoadedInfo ? (item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title) : '';
                                const text = item.isLoadedInfo ? longText : '...';
                                return <Link
                                    key={i}
                                    className={classes}
                                    to={`${url}/resource/view/${item.id}`}>{text}
                                </Link>;
                            })}
                        </div>
                    </div>
                </li>

                {/*<li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Utilities:</h6>
                            <a className="collapse-item" href="utilities-color.html">Colors</a>
                            <a className="collapse-item" href="utilities-border.html">Borders</a>
                            <a className="collapse-item" href="utilities-animation.html">Animations</a>
                            <a className="collapse-item" href="utilities-other.html">Other</a>
                        </div>
                    </div>
                </li>*/}

                <li className={`nav-item ${currentPage === 'donates' ? 'active' : ''}`}>
                    <Link className="nav-link" to={`${url}/donates`}>
                        <i className="fas fa-fw fa-chart-area"/>
                        <span>Donates</span></Link>
                </li>

                {/*<hr className="sidebar-divider"/>

                <div className="sidebar-heading">
                    Addons
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>

                <hr className="sidebar-divider d-none d-md-block"/>*/}

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

            </ul>

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                            <i className="fa fa-bars"/>
                        </button>

                        {/*<form
                            className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small"
                                       placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>*/}

                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown no-arrow d-sm-none">
                                <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-search fa-fw"/>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                     aria-labelledby="searchDropdown">
                                    <form className="form-inline mr-auto w-100 navbar-search">
                                        <div className="input-group">
                                            <input type="text" className="form-control bg-light border-0 small"
                                                   placeholder="Search for..." aria-label="Search"
                                                   aria-describedby="basic-addon2"/>
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="button">
                                                    <i className="fas fa-search fa-sm"/>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>

                            <li className="nav-item dropdown no-arrow mx-1">
                                <a className="nav-link dropdown-toggle" href="#a" id="alertsDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-bell fa-fw"/>
                                    {/*<span className="badge badge-danger badge-counter">3+</span>*/}
                                    <span className="badge badge-danger badge-counter">1</span>
                                </a>
                                <div
                                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="alertsDropdown">
                                    <h6 className="dropdown-header">
                                        Alerts Center
                                    </h6>
                                    <a className="dropdown-item d-flex align-items-center" href="#a">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-primary">
                                                <i className="fas fa-file-alt text-white"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 12, 2019</div>
                                            <span className="font-weight-bold">Welcome!</span>
                                        </div>
                                    </a>
                                    {/*<a className="dropdown-item d-flex align-items-center" href="#a">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-success">
                                                <i className="fas fa-donate text-white"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 7, 2019</div>
                                            $290.29 has been deposited into your account!
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#a">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-warning">
                                                <i className="fas fa-exclamation-triangle text-white"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 2, 2019</div>
                                            Spending Alert: We've noticed unusually high spending for your account.
                                        </div>
                                    </a>*/}
                                    {/*<a className="dropdown-item text-center small text-gray-500" href="#a">
                                        Show All Alerts
                                    </a>*/}
                                </div>
                            </li>

                            <div className="topbar-divider d-none d-sm-block"/>

                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#a" id="userDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                        {username ? username : '...'}
                                    </span>
                                    <img className="img-profile rounded-circle" src={userCircle} alt="User avatar"/>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                     aria-labelledby="userDropdown">
                                    {/*<a className="dropdown-item" href="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </a>
                                    <div className="dropdown-divider"></div>*/}
                                    <button className="dropdown-item" data-toggle="modal"
                                            data-target="#logoutModal">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"/>
                                        Logout
                                    </button>
                                </div>
                            </li>

                        </ul>

                    </nav>

                    <div className="container-fluid">

                        <Switch>
                            <Route exact path={`${path}`}>
                                <Dashboard/>
                            </Route>

                            <Route path={`${path}/resource/view/:id`}>
                                <ResourceView/>
                            </Route>

                            <Route path={`${path}/resource/create`}>
                                <ResourceCreate/>
                            </Route>
                        </Switch>
                    </div>
                </div>

                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Like 2020</span>
                        </div>
                    </div>
                </footer>

            </div>

        </div>

        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"/>
        </a>

        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={e => {
                            e.preventDefault();
                            onLogout();
                        }}>Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </Fragment>;
};
