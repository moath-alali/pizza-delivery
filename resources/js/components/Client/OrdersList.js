import React, { Component } from "react";
import Axios from "axios";

function formatDate(d) {
    d = new Date(d);
    var res = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    res += ' ' + d.getHours() + ':' + d.getMinutes();
    return res;
}

class ShoppingCart extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        Axios.get('/api/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            this.setState({
                orders: response.data.orders
            });
        }).catch((error) => {
            console.log(error);
            alert('No order with this tracking number!');
        });
    }

    showOrders(props) {
        const orders = props.orders;
        if (orders.length) {
            return (
                <tbody>
                    {
                        orders.map((el) => {
                            return (
                                <tr className="productitm text-center align-middle" id={el.id} key={el.id}>
                                    <td className="light">
                                        ${el.total}
                                    </td >
                                    <td className="light">
                                        {el.tracking_number}
                                    </td>
                                    <td className="light">
                                        {formatDate(el.created_at)}
                                    </td>
                                    <td className="light">
                                        {el.phone_number}
                                    </td>
                                    <td className="light">{el.status.status}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            );
        }
        return (
            <tbody>
                <tr className="productitm text-center align-middle">
                    <td colSpan="5" className="light">There is no orders :((</td>
                </tr>
            </tbody>
        );
    }

    render() {
        return (
            <div id="w">
                <header id="title">
                    <h1>Your orders</h1>
                </header>
                <div id="page">
                    <table id="cart">
                        <thead>
                            <tr className="text-center align-middle">
                                <th className="first">Cost</th>
                                <th className="second">Tracking number</th>
                                <th className="third">Status</th>
                                <th className="fourth">Phone number</th>
                                <th className="fifth">Date</th>
                            </tr>
                        </thead>
                        <this.showOrders orders={this.state.orders} />
                    </table>
                </div>
            </div>

        );
    }
}
export default ShoppingCart;