import React, { useContext } from 'react';

const CartContext = React.createContext();
const DispatchContext = React.createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'delete': {
      return {
        ...state,
        products: state.products.filter((product) => product.title !== action.product.title)
      };
    }
    case 'add': {
      return [...state, action.product];
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = React.useReducer(cartReducer, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={state}>
        {children}
      </CartContext.Provider>
    </DispatchContext.Provider>
  );
}

function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}

const useCartDispatch = () => useContext(DispatchContext);

export { CartProvider, useCart, useCartDispatch };
