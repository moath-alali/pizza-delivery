import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Client from './Client/Index';
import Admin from './Admin/Index';

export default class Index extends Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <Switch>
                <Route path="/admin/">
                    <Admin />
                </Route>
                <Route exact path="/*">
                    <Client />
                </Route>
            </Switch>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
