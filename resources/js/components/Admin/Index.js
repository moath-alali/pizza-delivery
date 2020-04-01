import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AddCategory from './Category/Add';
import AddItem from './Item/Add';
import Test from './test';


export default class Index extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location);
    }

    componentDidMount() {
    }

    checkLoggedIn(comp) {
        if (localStorage.getItem('access_token')) {
            return comp;
        } else {
            return <Redirect to="/admin/login" />
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/admin" exact render={() => (
                    this.checkLoggedIn(<Home />)
                )} />
                <Route path="/admin/category/add" exact render={() => (
                    this.checkLoggedIn(<AddCategory />)
                )} />
                <Route path="/admin/Item/add" exact render={() => (
                    this.checkLoggedIn(<AddItem />)
                )} />
                <Route exact path="/admin/home" exact render={() => (
                    this.checkLoggedIn(<Home />)
                )} />
                <Route exact path="/admin/login">
                    <Login />
                </Route>
            </Switch>
        );
    }
}