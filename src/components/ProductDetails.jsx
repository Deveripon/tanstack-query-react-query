import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async ({ queryKey }) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/${queryKey[0]}/${queryKey[1]}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const ProductDetails = ({ id }) => {
    
    const {
        data: product,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["products", id],
        queryFn: fetchProduct,
        gcTime: 1000,
    });

    return (
        <div>
            <h2>Product Details</h2>
            <div className='container mx-auto py-8 px-4'>
                <a
                    href='/'
                    className='text-blue-500 underline'>
                    Back to Products
                </a>
                <div className='mt-4 bg-white rounded-lg shadow-lg overflow-hidden'>
                    <img
                        src={product?.images[0]}
                        alt={product?.title}
                        className='w-full h-72 object-cover'
                    />
                    <div className='p-4'>
                        <h2 className='text-3xl font-semibold'>
                            {product?.title}
                        </h2>
                        <p className='text-gray-500 mt-2'>{product?.price}</p>
                        <p className='text-gray-700 mt-4'>
                            {product?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
