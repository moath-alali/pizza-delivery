import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';


export default class FullMenu extends Component {
    constructor() {
        super();
        this.addToCart = this.addToCart.bind(this);
        this.createAddToCartButton = this.createAddToCartButton.bind(this);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        Axios.get('/api/item').then(response => {
            this.setState({
                items: response.data
            });
        });
    }

    addToCart(item) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var count = localStorage.getItem('elements-in-cart');
        console.log(cart);
        if (cart == null || Object.keys(cart).length == 0) {
            cart = {};
        }
        console.log(cart);
        if (cart[item.id]) {
            cart[item.id]++;
            count = parseInt(count) + 1;
        } else {
            cart[item.id] = 1;
            count = parseInt(count) + 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('elements-in-cart', count);
        document.getElementById('elCount').innerHTML = count;
    }

    

    isInCart(itemId) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            return false;
        }
        if (!cart[itemId]) {
            return false;
        }
        return true;
    }

    createAddToCartButton(props) {
        var item = props.item;
        if (item.available) {
            return (
                <button onClick={() => this.addToCart(item)} className="btn btn-info btn-lg">
                    <span className="glyphicon glyphicon-shopping-cart"></span>
                    Add to Cart
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                <section className="page-section" id="services">
                    <div className="container">
                        <h2 style={{fontSize: "30px"}} className="text-center mt-0">Our Menu</h2>
                    </div>
                </section>
                <section id="portfolio">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            {
                                this.state.items.map(item => {
                                    return (
                                        <div className="col-lg-4 col-sm-6" key={item.id}>
                                            <a className="portfolio-box" >
                                                <img className="img-fluid" src={"/storage/images/" + item.image_path} style={{ width: "500px", height: "400px", objectFit: "cover" }} alt="" />
                                                <div className="portfolio-box-caption">
                                                    <div className="project-category text-white-20">{item.name}</div>
                                                    <div className="project-name">{item.description}</div>
                                                    <div className="project-category text-white-20">${item.price}</div>
                                                    <div className="project-category text-white-20">-{item.discount}%</div>
                                                    <this.createAddToCartButton item={item} />
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}