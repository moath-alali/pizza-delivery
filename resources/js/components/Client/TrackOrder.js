import React, { Component } from "react";
import Axios from "axios";

class ShoppingCart extends Component {
    constructor() {
        super();
        this.onChangeTrackingNumber = this.onChangeTrackingNumber.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.state = {
            order: null,
            trackingNumber: ''
        }
    }

    componentDidMount() {

    }

    onChangeTrackingNumber(e) {
        this.setState({
            trackingNumber: e.target.value
        });
    }

    getOrder() {
        Axios.get('/api/order/track/' + this.state.trackingNumber, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            this.setState({
                order: response.data
            });
        }).catch((error) => {
            console.log(error);
            alert('No order with this tracking number!');
        });
    }

    showOrder(props) {
        const order = props.order;
        if (order) {
            const items = order.items;
            return (
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
                        {
                            items.map((item) => {
                                return (
                                    <tr className="productitm text-center align-middle" id={item.id} key={item.id}>
                                        <td>
                                            <img style={{ width: "40px" }} src={"/storage/images/" + item.image_path} className="thumb" />
                                        </td>
                                        <td>{item.pivot.quantity}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.price}*{item.pivot.quantity}*{100 - item.discount}% ={item.price * (100 - item.discount) / 100 * item.pivot.quantity}
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="totalprice">
                            <td colSpan="5"><span className="thick">Your order is {order.status.status}</span></td>
                        </tr>
                        <tr className="totalprice">
                            <td className="light">Total:</td>
                            <td colSpan="2">&nbsp;</td>
                            <td colSpan="2"><span className="thick">${order.total}</span></td>
                        </tr>
                    </tbody>
                </table>
            );
        }
        return null;
    }

    showTotal(props) {
        const order = props.order;
        if (order) {
            return (
                <tr className="totalprice">
                    <td className="light">Total:</td>
                    <td colSpan="2">&nbsp;</td>
                    <td colSpan="2"><span className="thick">${order.total}</span></td>
                </tr>
            );
        }
        return null
    }

    render() {
        return (
            <div id="w">
                <header id="title">
                    <h1>Your order</h1>
                </header>
                <div id="page">
                    <this.showOrder order={this.state.order} />
                    <table id="cart">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    Tracking number:
                                    </td>
                                <td>
                                    <input placeholder="Tracking number" name="tracking_number" type="text" onChange={this.onChangeTrackingNumber} className="form-control mb-4" />
                                </td>
                            </tr>
                            <tr className="checkoutrow">
                                <td colSpan="5" className="checkout">
                                    <button onClick={this.getOrder} id="submitbtn">Track</button>
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