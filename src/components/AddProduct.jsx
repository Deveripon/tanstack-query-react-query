import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const AddProductForm = () => {
    const queryClient = useQueryClient();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        thumbnail: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type === "number") {
            value = Number(e.target.value);
        }
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /*     const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct((prevState) => ({
            ...prevState,
            thumbnail: URL.createObjectURL(file),
        }));
    }; */

    const { mutate } = useMutation({
        mutationFn: (newProductData) =>
            axios.post("http://localhost:8080/products", newProductData),

        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(["products"]);
        },

        onMutate: (variables) => {
            return {
                postData: variables,
            };
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDataWithId = {
            ...product,
            id: crypto.randomUUID().toString(),
        };
        mutate(newDataWithId);
    };

    return (
        <div className='max-w-xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-semibold text-center mb-6'>
                Add Product
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700'>
                        Product Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='title'
                        value={product.title}
                        onChange={handleChange}
                        required
                        className='mt-1 p-2 w-full border border-gray-300 rounded-lg'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='description'
                        className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={product.description}
                        onChange={handleChange}
                        required
                        className='mt-1 p-2 w-full border border-gray-300 rounded-lg'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='price'
                        className='block text-sm font-medium text-gray-700'>
                        Price ($)
                    </label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        required
                        className='mt-1 p-2 w-full border border-gray-300 rounded-lg'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='image'
                        className='block text-sm font-medium text-gray-700'>
                        Product Image
                    </label>
                    <input
                        type='text'
                        id='image'
                        name='thumbnail'
                        onChange={handleChange}
                        className='mt-1 p-2 w-full border border-gray-300 rounded-lg'
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
