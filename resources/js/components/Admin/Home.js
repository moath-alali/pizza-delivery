import React, { Component } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Home extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            redirectTo: ''
        }
    }

    handleLogout() {
        Axios.get('/api/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            console.log(response);
            this.setState({
                redirectTo: '/admin/login'
            })
        }).catch((error) => {
            console.log(error);
            alert('error logging out');
        });
    }

    render() {
        if(this.state.redirectTo){
            return <Redirect to={this.state.redirectTo} />
        }
        return (
            <div>
                <Link to="/admin/category/add">Add category</Link>
                <hr />
                <Link to="/admin/item/add">Add item</Link>
                <hr />
                <Link to="/admin/status/add">Add status</Link>
                <hr />
                <Link to="/admin/role/add">Add role</Link>
                <hr />
                <a onClick={this.handleLogout}>Log out</a>
            </div>
        );
    }
}