import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';


export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            token: [],
            user: []
        };
    }
    componentDidMount() {
        Axios.post('/api/login', { email: 'moath.alali@gmail.com', password: 'secretsecret' }).then(response => {
            console.log(response);
            this.setState({
                token: response.data.token
            });
            localStorage.setItem('access_token', response.data.token);
            Axios.get('/api/user', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            }).then(response => {
                console.log(response);
                this.setState({
                    user: response.data
                });
            });
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">{this.state.token}</div>
                            <div className="card-body">{JSON.stringify(this.state.user)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
