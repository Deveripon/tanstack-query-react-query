import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { useState } from "react";
import Pagination from "./Pagination";

const fetchProducts = async ({ queryKey }) => {
    console.log(queryKey);

    try {
        const response = await axios.get(
            `http://localhost:8080/${queryKey[0]}?_page=${queryKey[1].page}&_per_page=10`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const ProductList = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useQuery({
        queryKey: ["products", { page }],
        queryFn: fetchProducts,
    });

    function handlePageChange(page) {
        setPage(page);
    }

    return (
        <div>
            <div className=' mx-auto py-8 px-4'>
                <h2 className='text-3xl font-semibold text-center mb-8'>
                    Our Products
                </h2>
                {/* Product Grid */}

                <ul className='flex flex-wrap mt-5 gap-2 justify-center items-center '>
                    {isLoading ? (
                        <h2 className='h-[700px]'>Fetching Products....</h2>
                    ) : error ? (
                        <h2>Error While fetching Products</h2>
                    ) : (
                        data?.data.map((product) => (
                            <li
                                className=''
                                key={product.id}>
                                <ProductCard product={product} />
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <Pagination
                currentPage={data?.prev + 1}
                totalPages={20}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ProductList;
