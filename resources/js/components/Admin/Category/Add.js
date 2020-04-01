import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';

export default class Add extends Component {
    constructor() {
        super();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImagePath = this.onChangeImagePath.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            description: '',
            image_path: '',
            image: '',
            redirectTo: ''
        }
        this.fileInput = React.createRef();
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeImagePath(e) {
        var files = e.target.files || e.dataTransfer.files;
        this.setState({
            image_path: files[0].name
        });
        console.log(this.state.image_path);
        if (!files.length)
            return;
        this.createImage(files[0]);
    }

    createImage(file) {
        var reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                image: e.target.result
            });
        };
        reader.readAsDataURL(file);
    }


    async handleSubmit(e) {
        e.preventDefault();
        var data = {
            name: this.state.name,
            description: this.state.description,
            image_path: this.state.image_path,
            image: this.state.image
        };
        Axios.post('/api/category', data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            this.setState({
                rediredtTo: '/admin/home'
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                rediredtTo: '/admin/login'
            });
        });
    }

    render() {
        if (this.state.rediredtTo) {
            return <Redirect to={this.state.rediredtTo} />;
        }
        return (
            <form className="border border-light p-5 col-6">

                <p className="h4 mb-4 text-center">Add Category</p>

                <label htmlFor="textInput">Name</label>
                <input type="text" onChange={this.onChangeName} name="name" id="textInput" className="form-control mb-4" placeholder="Name" />

                <label htmlFor="textInput">Description</label>
                <input type="text" onChange={this.onChangeDescription} name="description" id="textInput" className="form-control mb-4" placeholder="Description" />

                <div className="input-group mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Image</span>
                    </div>
                    <div className="custom-file">
                        <input ref={this.fileInput} type="file" onChange={this.onChangeImagePath} name="image_path" className="custom-file-input" id="fileInput" aria-describedby="fileInput" />
                        <label className="custom-file-label" htmlFor="fileInput">Your file</label>
                    </div>
                </div>

                <button onClick={this.handleSubmit} className="btn btn-info btn-block my-4" type="submit">Submit</button>

            </form>
        );
    }
}