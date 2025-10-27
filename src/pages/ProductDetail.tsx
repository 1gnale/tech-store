import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useCart, type Product } from '../context/CartContext';
import ImageCarousel from '../components/ImageCarousel';
import productsData from '../data/products.json';

const ProductDetail: React.FC<{pageUrl: string}> = ({pageUrl}: {pageUrl: string}) => {
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
                        <div className="text-sm text-primary-600 font-semibold mb-2">
                            {product.category}
                        </div>
                        <h1 className="text-4xl font-bold text-secondary-900 mb-2">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-primary-600">
                                ${product.price}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-3xl text-secondary-400 line-through">
                                        ${product.originalPrice}
                                    </span>
                                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold text-lg">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>
                        {/* Status */}
                        <div className="flex gap-2 mb-1">
                            {!product.available && (
                                <span className="bg-gray-500 text-white px-2 py-1 rounded-full font-bold">
                                    Sin Stock
                                </span>
                            )}
                            {product.isNew && product.available && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded-full font-bold">
                                    Nuevo
                                </span>
                            )}
                            {product.isOnSale && product.available && (
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full font-bold">
                                    Oferta
                                </span>
                            )}
                        </div>

                        {/* Features */}
                        <div className="mb-5">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-1">Características:</h2>
                            <ul className="space-y-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="text-lg text-secondary-600 flex items-center">
                                        <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Button */}
                        <div className="mb-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.available}
                                className={`w-full py-3 rounded-lg transition-all font-semibold text-lg ${product.available
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

                        {/* QR Code Section */}
                        <div className="mt-1 pt-1 border-gray-200">
                            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                                    Enlace a este producto
                                </h3>
                                <div className="bg-gray-50 p-2 rounded-2xl border-2 border-gray-200 mb-6">
                                    <QRCodeSVG
                                        value={pageUrl}
                                        size={300}
                                        level="H"
                                        marginSize={2}
                                        fgColor="#1e3a8a"
                                        bgColor="#ffffff"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Copy URL Button */}
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(pageUrl);
                                alert('URL copiada al portapapeles');
                            }}
                            className="w-full py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                        >
                            Copiar URL
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default ProductDetail;
