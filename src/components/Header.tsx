import React from 'react';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';

const Header: React.FC = () => {
  const location = useLocation();
  const isProductDetail = location.pathname.startsWith('/product/');

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary-600">
              TechStore
            </div>
          </div>

          {/* Desktop Navigation - Solo visible en home */}
          {!isProductDetail && (
            <nav className="hidden md:flex space-x-8">
              <a href="#productos" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Productos
              </a>
              <a href="#caracteristicas" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Características
              </a>

            </nav>
          )}

          {/* CTA Button and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Cart />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;