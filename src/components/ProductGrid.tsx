import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, type Product } from '../context/CartContext';
import productsData from '../data/products.json';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch, state } = useCart();

  const isInCart = state.items.some(item => item.id === product.id);

  const handleCartAction = () => {
    if (product.available) {
      if (isInCart) {
        dispatch({ type: 'REMOVE_ITEM', payload: product.id });
      } else {
        dispatch({ type: 'ADD_ITEM', payload: product });
      }
    }
  };
  
  const handleViewDetails = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 p-8 text-center overflow-hidden h-64">
        <img 
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            !product.available ? 'opacity-50' : ''
          }`}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!product.available && (
            <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Sin Stock
            </span>
          )}
          {product.isNew && product.available && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Nuevo
            </span>
          )}
          {product.isOnSale && product.available && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Oferta
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="text-sm text-primary-600 font-semibold mb-1">
          {product.category}
        </div>
        <h3 className="text-xl font-bold text-secondary-900 mb-3">
          {product.name}
        </h3>
        
        {/* Features */}
        <ul className="space-y-1 mb-4">
          {product.features.map((feature, index) => (
            <li key={index} className="text-sm text-secondary-600 flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-secondary-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-secondary-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleViewDetails}
            className="flex-1 bg-secondary-600 text-white py-3 rounded-lg hover:bg-secondary-700 transition-colors font-semibold"
          >
            Ver Detalles
          </button>
          <button 
            onClick={handleCartAction}
            disabled={!product.available}
            className={`flex-1 py-3 rounded-lg transition-colors font-semibold ${
              product.available
                ? isInCart
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {!product.available 
              ? 'Sin Stock' 
              : isInCart 
                ? 'Quitar del Carrito' 
                : 'Agregar al Carrito'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setProducts(productsData as Product[]);
  }, []);

  const featuredProducts = products.filter(product => product.featured);
  const displayedProducts = showAll ? products : featuredProducts;

  const handleToggleProducts = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            {showAll ? 'Todos los Productos' : 'Productos Destacados'}
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            {showAll 
              ? 'Explora nuestra colección completa de productos para el hogar, oficina y más.'
              : 'Descubre nuestra selección de productos destacados con la mejor calidad y precio.'
            }
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>

        {/* View All Button */}
        {
          products.length > 6 && (
        <div className="text-center mt-12">
          <button 
            onClick={handleToggleProducts}
            className="bg-secondary-100 text-secondary-700 px-8 py-3 rounded-lg hover:bg-secondary-200 transition-colors font-semibold"
          >
            {showAll ? 'Ver Solo Destacados' : `Ver Todos los Productos (${products.length - featuredProducts.length} más)`}
          </button>
        </div>
          )
        }
      </div>
    </section>
  );
};

export default ProductGrid;