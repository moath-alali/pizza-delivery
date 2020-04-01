import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Error404 from './Error404';
import Contact from './Contact';
import FullMenu from './FullMenu';
import MastHead from "./MastHead";
import ShoppingCart from './shoppingCart';
import Login from './Login';
import TrackOrder from './TrackOrder';
import OrdersList from './OrdersList';
import Signup from './Signup';

export default class Index extends Component {
    componentDidMount() {
        if (!localStorage.getItem('elements-in-cart')) {
            localStorage.setItem('elements-in-cart', 0);
        } else {
            var count = parseInt(localStorage.getItem('elements-in-cart'));
            localStorage.setItem('elements-in-cart', count);
            document.getElementById('elCount').innerHTML = count;
        }
    }
    render(match) {
        return (
            <div id="cont">
                <Navigation />
                <MastHead />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                    <Route exact path="/track">
                        <TrackOrder />
                    </Route>
                    <Route exact path="/orders">
                        <OrdersList />
                    </Route>
                    <Route exact path="/shopping-cart">
                        <ShoppingCart />
                    </Route>
                    <Route exact path="/full-menu">
                        <FullMenu />
                    </Route>
                    <Route exact path="/contact">
                        <Contact />
                    </Route>
                    <Route>
                        <Error404 />
                    </Route>
                </Switch>
                <Footer />
            </div>
        );
    }
}