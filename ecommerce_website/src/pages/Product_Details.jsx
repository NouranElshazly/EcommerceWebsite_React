import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { axiosInstance } from "../apis/config";
import { addToCart } from "../store/slice/Cart";   
import { increaseCounter } from "../store/slice/counter";  
const Product_Details = () => {
    const [productDetails, setProductDetails] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter);
 
    useEffect(() => {
        axiosInstance
            .get(`/products/${id}`)
            .then((res) => setProductDetails(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleAddToCart = () => {
        if (productDetails) {
            dispatch(addToCart(productDetails));  
         }
    };

    return (
        <>
            <h4 style={{ marginTop: "90px", textAlign: "center", color: "rgb(86, 2, 31)" }}>
                {productDetails?.title} Details
            </h4>
            <hr />
            <div
                className="card d-flex flex-column flex-md-row align-items-center justify-content-center"
                style={{
                    width: "90%",
                    maxWidth: "50rem",
                    margin: "50px auto",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(46, 45, 45, 0.1)",
                }}
            >
                <img
                    className="card-img-left"
                    src={productDetails?.thumbnail}
                    alt="Card image cap"
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        height: "auto",
                        objectFit: "cover",
                        marginBottom: "20px",
                        marginRight: "40px",
                        borderRadius: "8px",
                    }}
                />
                <div className="card-body text-md-left">
                    <h5 className="card-title">{productDetails?.title}</h5>
                    <p className="card-text">Description: {productDetails?.description}</p>
                    <div>
                        <Badge bg="info"> {productDetails?.rating}</Badge>
                        <br />
                        <Badge bg="warning"> {productDetails?.discountPercentage} %</Badge>
                    </div>
                    <div
                        style={{
                            fontSize: "1rem",
                            color: "red",
                        }}
                    >
                        Price: <Badge bg="secondary"> {productDetails?.price} $ </Badge>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <button
                    className="btn "
                    style={{
                        padding: "10px 20px",
                        fontSize: "1rem",
                        color: "white",
                        backgroundColor:  "rgb(125, 28, 74)",
                    }}
                    onClick={() => {
                        dispatch(increaseCounter(counter.value + 1));
                        handleAddToCart();
                    }}
                >
                    Add To Cart
                </button>
            </div>
        </>
    );
};
export default Product_Details;