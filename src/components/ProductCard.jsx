import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/products/${id}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const ProductCard = ({ product }) => {
    //delete single product logic
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(["products"]);
        },
    });
    //delete single product logic

    return (
        <div className='bg-white rounded-lg shadow-lg  w-[300px] mt-5'>
            <img
                src={product?.thumbnail}
                alt='Product Image'
                className='w-full h-56 object-cover'
            />
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>{product?.title}</h3>
                <p className='text-gray-500 mt-1'>${product?.price}</p>
                <p className='text-gray-700 mt-2'>{product?.description}</p>
                <button className='bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition'>
                    Add to Cart
                </button>
                <button
                    onClick={() => {
                        mutate(product?.id);
                    }}>
                    Delete Item
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
