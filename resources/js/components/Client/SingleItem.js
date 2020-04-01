import React, { Component } from 'react';
import Axios from 'axios';


export default class SingleItem extends Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.createAddToCartButton = this.createAddToCartButton.bind(this);
        this.state = {
            item: ''
        };
    }

    componentDidMount() {
        console.log(this.state);
        Axios.get('/api/item/' + this.state.id).then(response => {
            console.log(response.data);
            this.setState({
                item: response.data
            });
        });
    }

    addToCart(item) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = {};
        }
        if (cart[item.id]) {
            cart[item.id]++;
        } else {
            cart[item.id] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    createAddToCartButton(props) {
        var item = props.item;
        if (item.available) {
            return (
                <button onClick={() => this.addToCart(item)} className="btn btn-primary btn-xl js-scroll-trigger">
                    <span className="glyphicon glyphicon-shopping-cart"></span>
                    Add to Cart
                </button>
            );
        }
        return null;
    }

    render() {
        return (
            <section id="portfolio">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col">
                            <a className="portfolio-box" >
                                <img className="img-fluid" src={"/storage/images/" + this.state.item.image_path} style={{ width: "500px", height: "400px", objectFit: "cover" }} alt="" />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-20">{this.state.item.name}</div>
                                    <div className="project-name">{this.state.item.description}</div>
                                    <div className="project-category text-white-20">{this.state.item.price}$</div>
                                    <div className="project-category text-white-20">-{this.state.item.discount}%</div>
                                    <this.createAddToCartButton item={this.state.item} />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}