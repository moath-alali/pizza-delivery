import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Axios from "axios";
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor() {
        super();
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
        this.state = {
            email: '',
            password: '',
            name: '',
            password_confirmation: '',
            rediredtTo: ''
        }
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePasswordConfirmation(e) {
        this.setState({
            password_confirmation: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleSignup(e) {
        e.preventDefault();
        Axios.post('/api/register', {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            password_confirmation: this.state.password_confirmation
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('access_token', response.data.token);
                this.setState({
                    rediredtTo: '/home'
                });
            } else {
                alert('Sign up failed!');
            }
        }).catch((error) => {
            console.log(error);
            alert('sign up failed!');
        });
    }

    render() {
        if (this.state.rediredtTo) {
            return <Redirect to={this.state.rediredtTo} />;
        }
        return (
            <section className="page-section">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol className="col">
                            <form>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Type your name" onChange={this.onChangeName} name="name" icon="address-card" group type="text" validate error="wrong"
                                        success="right" />
                                    <MDBInput label="Type your email" onChange={this.onChangeEmail} name="email" icon="envelope" group type="email" validate error="wrong"
                                        success="right" />
                                    <MDBInput label="Type your password" onChange={this.onChangePassword} name="password" icon="lock" group type="password" validate />
                                    <MDBInput label="confirm your password" onChange={this.onChangePasswordConfirmation} name="password_confirmation" icon="lock" group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={this.handleSignup}>Login</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        );
    }
}