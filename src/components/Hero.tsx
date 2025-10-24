import React, { useState, useEffect } from 'react';
import { useCart, type Product } from '../context/CartContext';
import productsData from '../data/products.json';

const Hero: React.FC = () => {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const { dispatch } = useCart();

  const getRandomProduct = () => {
    const products = productsData as Product[];
    // Filtrar solo productos disponibles
    const availableProducts = products.filter(product => product.available);
    
    if (availableProducts.length === 0) {
      return null; // No hay productos disponibles
    }
    
    let randomProduct;
    do {
      const randomIndex = Math.floor(Math.random() * availableProducts.length);
      randomProduct = availableProducts[randomIndex];
    } while (randomProduct?.id === featuredProduct?.id && availableProducts.length > 1);
    return randomProduct;
  };

  const changeProductWithTransition = () => {
    const newProduct = getRandomProduct();
    if (newProduct) {
      setIsTransitioning(true);
      setTimeout(() => {
        setFeaturedProduct(newProduct);
        setIsTransitioning(false);
      }, 300); // 300ms para la transición de salida
    }
  };

  useEffect(() => {
    // Seleccionar un producto aleatorio disponible del JSON al cargar
    const initialProduct = getRandomProduct();
    setFeaturedProduct(initialProduct);
  }, []);

  // Cambio automático cada 5 segundos con barra de progreso
  useEffect(() => {
    // Solo iniciar el temporizador si hay un producto disponible
    if (!featuredProduct) return;
    
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / 50); // 50 intervalos de 100ms para 5 segundos
      });
    }, 100);

    const changeInterval = setInterval(() => {
      changeProductWithTransition();
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(changeInterval);
    };
  }, [featuredProduct]); // Dependencia en featuredProduct para evitar productos repetidos

  const addToCart = () => {
    if (featuredProduct && featuredProduct.available) {
      dispatch({ type: 'ADD_ITEM', payload: featuredProduct });
    }
  };

  if (!featuredProduct) {
    return (
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Cargando...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Tecnología
              <span className="text-primary-600"> Premium</span>
              <br />
              para tu vida diaria
            </h1>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Descubre nuestra colección de auriculares Bluetooth, cargadores rápidos y 
              accesorios tecnológicos de última generación. Calidad garantizada y diseño innovador.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            </div>
          </div>

          {/* Hero Image/Product */}
          <div className="relative">
            <div className={`bg-white rounded-2xl shadow-large p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl p-8 text-center">
                <div className={`w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  isTransitioning ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
                }`}>
                  <div className="text-6xl">{featuredProduct.image}</div>
                </div>
                <h3 className={`text-white text-xl font-bold mb-2 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  {featuredProduct.name}
                </h3>
                <p className={`text-white/90 mb-4 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  {featuredProduct.category}
                </p>
                <div className={`flex items-center justify-center gap-2 mb-4 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="text-2xl font-bold text-white">${featuredProduct.price}</div>
                  {featuredProduct.originalPrice && (
                    <div className="text-lg text-white/70 line-through">${featuredProduct.originalPrice}</div>
                  )}
                </div>
                <div className={`flex gap-2 justify-center transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <button 
                    onClick={addToCart}
                    disabled={!featuredProduct.available}
                    className={`px-4 py-2 rounded-lg font-semibold backdrop-blur-sm transition-colors ${
                      featuredProduct.available
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-gray-500/20 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {featuredProduct.available ? 'Agregar al Carrito' : 'Sin Stock'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            {!featuredProduct.available && (
              <div className={`absolute -top-4 -right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
                isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`}>
                Sin Stock
              </div>
            )}
            {featuredProduct.isNew && featuredProduct.available && (
              <div className={`absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-bounce transition-all duration-300 ${
                isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`}>
                ¡Nuevo!
              </div>
            )}
            {featuredProduct.isOnSale && featuredProduct.available && (
              <div className={`absolute -bottom-4 -left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
                isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`}>
                ¡Oferta!
              </div>
            )}
            {!featuredProduct.isNew && !featuredProduct.isOnSale && featuredProduct.available && (
              <div className={`absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
                isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`}>
                Envío Gratis
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-primary-600 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-secondary-500 text-sm mt-2">
              Próximo producto en {Math.ceil((100 - progress) / 20)} segundos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;