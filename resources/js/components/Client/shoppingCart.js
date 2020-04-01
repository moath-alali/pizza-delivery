import React, { Component } from "react";
import Axios from "axios";

class ShoppingCart extends Component {
    constructor() {
        super();
        this.removeFromCart = this.removeFromCart.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeHouse = this.onChangeHouse.bind(this);
        this.onChangeFloor = this.onChangeFloor.bind(this);
        this.onChangeAppartement = this.onChangeAppartement.bind(this);
        this.order = this.order.bind(this);
        this.state = {
            items: [],
            trackingNumber: ''
        }
    }

    getItem(id, arr) {
        for (var ind in arr) {
            if (arr[ind].id == id) {
                return arr[ind];
            }
        }
    }

    componentDidMount() {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var count = localStorage.getItem('elements-in-cart');
        var items = [];
        var ids = [];
        if (cart) {
            for (const key in cart) {
                ids.push(key);
            }
            var data = {
                ids: ids
            };
            Axios.post('/api/item/many', data).then(response => {
                for (const key in cart) {
                    var item = this.getItem(key, response.data);
                    var value = cart[key];
                    items.push({
                        item: item,
                        quantity: value
                    });
                }
                this.setState({
                    items: items
                });
            });
        }
    }


    removeFromCart(item) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var count = localStorage.getItem('elements-in-cart');
        if (cart == null || Object.keys(cart).length == 0) {
            return;
        }
        if (cart[item.id] && cart[item.id] > 0) {
            count = parseInt(count) - cart[item.id];
            cart[item.id] = 0;
        }
        if (cart[item.id] == 0) {
            delete cart[item.id];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('elements-in-cart', count);
        document.getElementById('elCount').innerHTML = count;
        document.getElementById(item.id).remove();
    }

    findChangedElement(els, id) {
        for (const key in els) {
            if (els[key].item.id == id) {
                return key;
            }
        }
    }
    onChangeItemQuantity(id, e) {
        var els = [...this.state.items];
        const key = this.findChangedElement(els, id);
        if (e.target.value) {
            els[key].quantity = e.target.value;
        }
        this.setState({
            items: els
        });
        var cart = JSON.parse(localStorage.getItem('cart'));
        var count = localStorage.getItem('elements-in-cart');
        if (cart == null || Object.keys(cart).length == 0) {
            return;
        }
        if (cart[id] && cart[id] > 0) {
            count = parseInt(count) - (cart[id] - parseInt(e.target.value));
            cart[id] = e.target.value;
        }
        if (cart[id] == 0) {
            delete cart[id];
            document.getElementById(id).remove();
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('elements-in-cart', count);
        document.getElementById('elCount').innerHTML = count;
    }

    calculateDiscount() {
        var discount = 0;
        var els = this.state.items;
        for (const i in els) {
            discount += els[i].quantity * els[i].item.price * els[i].item.discount / 100;
        }
        return discount;
    }

    calculateTotal() {
        var total = 0;
        var els = this.state.items;
        for (const i in els) {
            total += els[i].quantity * els[i].item.price * (100 - els[i].item.discount) / 100;
        }
        return total;
    }

    emptyCart() {
        localStorage.setItem('cart', JSON.stringify({}));
        localStorage.setItem('elements-in-cart', "0");
        this.setState({
            items: []
        });
        document.getElementById('elCount').innerHTML = "0";
    }

    order() {
        var items_list = [];
        var els = this.state.items;
        for (const i in els) {
            items_list.push({
                item_id: els[i].item.id,
                quantity: els[i].quantity
            });
        }
        var data = {
            items_list: items_list,
            phone_number: this.state.phone_number,
            city: this.state.city,
            street: this.state.street,
            house: this.state.house,
            floor: this.state.floor,
            appartement: this.state.appartement
        }
        Axios.post('/api/order', data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            this.emptyCart();
            console.log(response.data);
            this.setState({
                trackingNumber: response.data.tracking_number
            })
        }).catch((error) => {
            console.log(error);
            alert("please fill in required information!!");
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            phone_number: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeStreet(e) {
        this.setState({
            street: e.target.value
        });
    }

    onChangeHouse(e) {
        this.setState({
            house: e.target.value
        });
    }

    onChangeFloor(e) {
        this.setState({
            floor: e.target.value
        });
    }

    onChangeAppartement(e) {
        this.setState({
            appartement: e.target.value
        });
    }

    showTrackingNumber(props) {
        const trackingNumber = props.trackingNumber;
        console.log(trackingNumber);
        if (trackingNumber) {
            return (
                <tr>
                    <td colSpan="5" id="track">
                        Your tracking number is: {trackingNumber}
                    </td>
                </tr>
            );
        }
        return null;
    }

    render() {
        return (
            <div id="w">
                <header id="title">
                    <h1>Your order</h1>
                </header>
                <div id="page">
                    <table id="cart">
                        <thead>
                            <tr className="text-center align-middle">
                                <th className="first">Photo</th>
                                <th className="second">Quantity</th>
                                <th className="third">Product</th>
                                <th className="fourth">Line Total ($)</th>
                                <th className="fifth">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <this.showTrackingNumber trackingNumber={this.state.trackingNumber} />
                                {
                                    this.state.items.map((el) => {
                                        return (
                                            <tr className="productitm text-center align-middle" id={el.item.id} key={el.item.id}>
                                                <td>
                                                    <img style={{ width: "40px" }} src={"/storage/images/" + el.item.image_path} className="thumb" />
                                                </td>
                                                <td>
                                                    <input type="text" onChange={() => { }} onInput={this.onChangeItemQuantity.bind(this, el.item.id)} value={el.quantity} min="0" className="qtyinput" />
                                                </td>
                                                <td>{el.item.name}</td>
                                                <td>
                                                    {el.item.price}*{1 - el.item.discount}={el.item.price * (1 - el.item.discount) * el.quantity}
                                                </td>
                                                <td>
                                                    <span className="remove" onClick={() => { this.removeFromCart(el.item) }}><img src="https://i.imgur.com/h1ldGRr.png" alt="X" /></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr className="extracosts">
                                    <td className="light">Your discount</td>
                                    <td colSpan="2" className="light"></td>
                                    <td>${this.calculateDiscount()}</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr className="totalprice">
                                    <td className="light">Total:</td>
                                    <td colSpan="2">&nbsp;</td>
                                    <td colSpan="2"><span className="thick">${this.calculateTotal()}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        Phone Number:
                                </td>
                                    <td>
                                        <input placeholder="Phone number" name="phone_number" type="text" onChange={this.onChangePhoneNumber} className="form-control mb-4" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        City:
                                </td>
                                    <td>
                                        <input placeholder="City" name="city" type="text" onChange={this.onChangeCity} className="form-control mb-4" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        Street:
                                </td>
                                    <td>
                                        <input placeholder="Street" name="street" type="text"  onChange={this.onChangeStreet} className="form-control mb-4" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        House:
                                </td>
                                    <td>
                                        <input placeholder="House" name="house" type="text"  onChange={this.onChangeHouse} className="form-control mb-4" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        Floor:
                                </td>
                                    <td>
                                        <input placeholder="Floor" name="floor" type="text"  onChange={this.onChangeFloor} className="form-control mb-4" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        Appartement:
                                </td>
                                    <td>
                                        <input placeholder="Appartement" name="appartement" type="text"  onChange={this.onChangeAppartement} className="form-control mb-4" />
                                    </td>
                                </tr>
                                <tr className="checkoutrow">
                                    <td colSpan="5" className="checkout">
                                        <button onClick={this.order} id="submitbtn">Checkout Now!</button>
                                    </td>
                                </tr>
                            </tbody>
                    </table>
                </div>
                </div>

        );
    }
}
export default ShoppingCart;