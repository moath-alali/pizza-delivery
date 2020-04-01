import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Axios from "axios";
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor() {
        super();
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            email: '',
            password: '',
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

    handleLogin(e) {
        e.preventDefault();
        Axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('access_token', response.data.token);
                console.log('logged in!');
                this.setState({
                    rediredtTo: '/admin/home'
                });
            } else {
                alert('Login failed!');
            }
        }).catch((error) => {
            console.log(error);
            alert('Login failed!');
        });
    }

    render() {
        if (this.state.rediredtTo) {
            return <Redirect to={this.state.rediredtTo} />;
        }
        return (
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Type your email" onChange={this.onChangeEmail} name="email" icon="envelope" group type="email" validate error="wrong"
                                        success="right" />
                                    <MDBInput label="Type your password" onChange={this.onChangePassword} name="password" icon="lock" group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn onClick={this.handleLogin}>Login</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        );
    }
}