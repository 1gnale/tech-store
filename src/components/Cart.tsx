import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-secondary-600 hover:text-primary-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13h10" />
        </svg>
        {state.itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {state.itemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-secondary-900">
                  Carrito de Compras
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-secondary-500">Tu carrito está vacío</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Continuar comprando
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="text-2xl">{item.image}</div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-secondary-900">{item.name}</h3>
                          <p className="text-sm text-secondary-500">{item.category}</p>
                          <p className="font-semibold text-primary-600">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary-600">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                      Proceder al Pago
                    </button>
                    
                    <button
                      onClick={clearCart}
                      className="w-full bg-secondary-100 text-secondary-700 py-2 rounded-lg hover:bg-secondary-200 transition-colors"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;