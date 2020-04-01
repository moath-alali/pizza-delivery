import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

export default class Navigation extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            user: '',
            redirectTo: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('access_token');
        if (token) {
            Axios.get('/api/user', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                this.setState({
                    user: response.data
                });
            });
        }
    }

    showUser(props) {
        const user = props.user;
        if (user) {
            return (
                <li className="nav-item">
                    <Link className="nav-link js-scroll-trigger" to="/orders">Welcome {user.name}</Link>
                </li>
            );
        }
        return (
            <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="/login">Log in</Link>
            </li>
        );
    }

    showLogout(props) {
        const user = props.user;
        const th = props.th;
        if (user) {
            return (
                <li className="nav-item">
                    <a onClick={th.handleLogout} className="nav-link js-scroll-trigger">Log out</a>
                </li>
            );
        }
        return (
            <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="/signup">Sign up</Link>
            </li>
        );
    }

    handleLogout() {
        Axios.get('/api/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            console.log(response);
            this.setState({
                user: ''
            });
            localStorage.setItem('access_token', '');
        }).catch((error) => {
            console.log(error);
            alert('error logging out');
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand js-scroll-trigger" to="/home">Stay at home!</Link><button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto my-2 my-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/full-menu">Menu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/shopping-cart">
                                    <i className="fas fa-shopping-cart fa-2x mb-3"></i><span id="elCount" className="badge">0</span>
                                </Link>
                            </li>
                            <this.showUser user={this.state.user} />
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/track">Track your order</Link>
                            </li>
                            <this.showLogout user={this.state.user} th={this} />
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}