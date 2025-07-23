import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from "./Nav";

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        alert(`${product.title} added to cart!`);

        console.log('Added to cart:', product);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    return (
<>
        <Nav/>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">



            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Products
                </button>

                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">

                    <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-96 object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                                {product.category}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-gray-600">
                                        {product.rating?.rate} ({product.rating?.count} reviews)
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6">{product.description}</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                                <div className="flex items-center">
                                    <button className="px-3 py-1 border border-gray-300 rounded-l-lg text-gray-700 hover:bg-gray-100">
                                        -
                                    </button>
                                    <span className="px-4 py-1 border-t border-b border-gray-300">1</span>
                                    <button className="px-3 py-1 border border-gray-300 rounded-r-lg text-gray-700 hover:bg-gray-100">
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</>
    );

}

export default Detail;