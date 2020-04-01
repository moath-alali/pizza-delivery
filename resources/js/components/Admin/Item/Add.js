import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';

export default class Add extends Component {
    constructor() {
        super();
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImagePath = this.onChangeImagePath.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            description: '',
            image_path: '',
            image: '',
            price: 0,
            available: 0,
            discount: 0,
            redirectTo: '',
            category_id: '',
            categories: []
        }
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        Axios.get('/api/category').then(response => {
            this.setState({
                categories: response.data
            });
        });
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

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeAvailable(e) {
        this.setState({
            available: e.target.checked
        });
    }

    onChangeDiscount(e) {
        this.setState({
            discount: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category_id: e.target.value
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
            image: this.state.image,
            price: this.state.price,
            available: this.state.available,
            discount: this.state.discount,
            category_id: this.state.category_id
        };
        Axios.post('/api/item', data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            console.log(response);
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

                <p className="h4 mb-4 text-center">Add Item</p>

                <label htmlFor="textInput">Name</label>
                <input type="text" onChange={this.onChangeName} name="name" id="textInput" className="form-control mb-4" placeholder="Name" />

                <label htmlFor="textInput">Description</label>
                <input type="text" onChange={this.onChangeDescription} name="description" id="textInput" className="form-control mb-4" placeholder="Description" />
                <label htmlFor="textInput">Price</label>
                <input type="text" onChange={this.onChangePrice} name="price" id="textInput" className="form-control mb-4" placeholder="Price" />
                <label htmlFor="textInput">Discount</label>
                <input type="text" onChange={this.onChangeDiscount} name="discount" id="textInput" className="form-control mb-4" placeholder="Discount" />

                <label htmlFor="select">Category</label>
                <select onChange={this.onChangeCategory} htmlFor="browser-default custom-select mb-4" id="select">
                    <option value=""  defaultValue="">Choose category</option>
                    {
                        this.state.categories.map(cat => {
                            return (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            )
                        })
                    }
                </select>

                <div className="input-group mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Image</span>
                    </div>
                    <div className="custom-file">
                        <input ref={this.fileInput} type="file" onChange={this.onChangeImagePath} name="image_path" className="custom-file-input" id="fileInput" aria-describedby="fileInput" />
                        <label className="custom-file-label" htmlFor="fileInput">Your file</label>
                    </div>
                </div>

                <div htmlFor="d-flex justify-content-between">
                    <div>
                        <div htmlFor="custom-control custom-checkbox">
                            <input type="checkbox" onChange={this.onChangeAvailable} name="available" htmlFor="custom-control-input" id="defaultLoginFormRemember" />
                            <label htmlFor="custom-control-label" htmlFor="defaultLoginFormRemember">Available</label>
                        </div>
                    </div>
                </div>

                <button onClick={this.handleSubmit} className="btn btn-info btn-block my-4" type="submit">Submit</button>

            </form>
        );
    }
}