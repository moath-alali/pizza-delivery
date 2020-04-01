import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component {
    render() {
        return (
            <section className="page-section bg-primary" id="about">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">We've got what you need!</h2>
                            <hr className="divider light my-4" />
                            <p className="text-white-50 mb-4">Just stay at home and wash your hands!</p>
                            <Link className="btn btn-light btn-xl js-scroll-trigger" to="/full-menu">Order now!</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

