import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart, type Product } from '../context/CartContext';
import ImageCarousel from '../components/ImageCarousel';
import productsData from '../data/products.json';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { dispatch, state } = useCart();
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const product = (productsData as Product[]).find(p => p.id === parseInt(id || '0'));
    const isInCart = product && state.items.some(item => item.id === product.id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-secondary-900 mb-4">Producto no encontrado</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (product && product.available) {
            if (isInCart) {
                dispatch({ type: 'REMOVE_ITEM', payload: product.id });
                setIsAddedToCart(false);
            } else {
                dispatch({ type: 'ADD_ITEM', payload: product });
                setIsAddedToCart(true);
                setTimeout(() => setIsAddedToCart(false), 2000);
            }
        }
    };

    return (
        <main className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al inicio
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                        {product.images && product.images.length > 0 ? (
                            <ImageCarousel images={product.images} productName={product.name} />
                        ) : (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md h-96 object-cover rounded-2xl shadow-large"
                            />
                        )}
                    </div>

                    {/* Product Details */}
                    <div>
                        <div className="text-lg text-primary-600 font-semibold mb-4">
                            {product.category}
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-secondary-900 mb-4">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl lg:text-5xl font-bold text-primary-600">
                                ${product.price}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-4xl lg:text-5xl text-secondary-400 line-through">
                                        ${product.originalPrice}
                                    </span>
                                    <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold text-xl">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>
                        {/* Status */}
                        <div className="flex gap-3 mb-6">
                            {!product.available && (
                                <span className="bg-gray-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                                    Sin Stock
                                </span>
                            )}
                            {product.isNew && product.available && (
                                <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                                    Nuevo
                                </span>
                            )}
                            {product.isOnSale && product.available && (
                                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                                    Oferta
                                </span>
                            )}
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">Características:</h2>
                            <ul className="space-y-4">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="text-xl lg:text-2xl text-secondary-600 flex items-center">
                                        <svg className="w-8 h-8 text-green-500 mr-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Button */}
                        <div className="mb-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.available}
                                className={`w-full py-4 rounded-lg transition-all font-semibold text-xl lg:text-2xl ${product.available
                                        ? isInCart
                                            ? 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
                                            : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {!product.available 
                                    ? 'Sin Stock' 
                                    : isAddedToCart 
                                        ? '✓ Agregado al carrito' 
                                        : isInCart
                                            ? 'Quitar del Carrito'
                                            : 'Agregar al Carrito'
                                }
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default ProductDetail;
