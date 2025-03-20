import React, { useEffect, useState } from "react";
import { ProductCard } from "../component/ProductCard";
import { axiosInstance } from "../apis/config";
import ReactPaginate from "react-paginate";
import './Pagination.css'; // Import CSS for styling
import Loader from "../component/loader";
 
const All_products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Products per page
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosInstance
            .get(`/products`)
            .then((response) => setProducts(response.data.products))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
            
    }, []);

 
    const handleDeleteProduct = (id) => {
        const newList = products.filter((product) => product.id !== id);
        setProducts(newList);
    };
 
    const offset = currentPage * itemsPerPage;
    const currentItems = products.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    // Handle page change
    const handlePageChange = ({ selected }) => setCurrentPage(selected);

    return (
        <>
            <div className="container "
            style={{
                marginTop :"100px"
            }}
            >
                <h2 className="text-center"
                style={{
                    color:"rgb(86, 2, 31)"
                }}
                

                >Products</h2>
                <hr />
                {loading && <Loader />}
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {currentItems.map((product) => (
                        <div className="col" key={product.id}>
                            <ProductCard
                                productItem={product}
                                handleDeleteProduct={(id) => handleDeleteProduct(id)}
                            />
                        </div>
                    ))}
                </div>

                {/* React Paginate Component */}
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageChange }
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        previousClassName={"previous"}
                        nextClassName={"next"}
                        disabledClassName={"disabled"}
                     
                    />
                </div>
            </div>
        </>
    );
};
export default All_products;