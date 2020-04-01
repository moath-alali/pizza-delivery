import React from 'react';
import { Component } from 'react';
import FullMenu from './FullMenu';
import Contact from './Contact';
import About from './About';

export default class Home extends Component {
    render() {
        return (
            <div>
                <About />
                <FullMenu />
                <Contact />
            </div>
        );
    }
}