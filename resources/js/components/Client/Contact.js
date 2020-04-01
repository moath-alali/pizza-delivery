import React, { Component } from 'react';

export default class Contact extends Component {
    render() {
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="mt-0">Let's Get In Touch!</h2>
                            <hr className="divider my-4" />
                            <p className="text-muted mb-5">Ready to start tell us your opinion or suggest an enhancement? 
                                Give us a call or send us an email and we will get back to you as soon as possible!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                            <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
                            <div>+7 (999) 217-4964</div>
                        </div>
                        <div className="col-lg-4 mr-auto text-center">
                            <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
                            <a className="d-block" href="mailto:moath.alali.94@gmail.com">moath.alali.94@gmail.com</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}