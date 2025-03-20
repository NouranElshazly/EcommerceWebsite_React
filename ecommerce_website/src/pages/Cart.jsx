import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/slice/Cart';
import { decreaseCounter, increaseCounter } from '../store/slice/counter';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9',  marginTop:"100px"}}>
            <h1 style={{ color: "rgb(86, 2, 31)", textAlign: 'center', marginBottom: '30px' }}>Shopping Cart</h1>
            <hr />
            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>Your cart is empty.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="table table-striped" style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minWidth: '600px' }}>
                        <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginRight: "10px",
                                                    border: '1px solid #ddd'
                                                }}
                                            />
                                            {item.title}
                                        </div>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ marginRight: '5px' }}
                                            onClick={() => {
                                                dispatch(decreaseQuantity(item.id));
                                                dispatch(decreaseCounter(counter.value - 1));
                                            }}
                                        >
                                            -
                                        </button>
                                        <span style={{ margin: "0 10px", fontWeight: 'bold' }}>{item.quantity}</span>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => {
                                                dispatch(increaseQuantity(item.id));
                                                dispatch(increaseCounter(counter.value + 1));
                                            }}
                                        >
                                            +
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                        <h3>
                            Total: <span style={{ color: "#D17D98", fontWeight: 'bold' }}>${calculateTotal().toFixed(2)}</span>
                        </h3>
                        <button
                            className="btn  "
                            style={{
                                backgroundColor :"rgb(125, 28, 74)",
                                marginTop: "10px",
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                color :"white"
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
