import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Error404 extends Component {
    render() {
        return (
            <div className="alert alert-danger">
                <Link to="/">Go back to home</Link>
            </div>
        );
    }
}