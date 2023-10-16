import {createContext, useReducer} from "react";
import {CartProduct, Product} from "../interfaces/product.interface";
import {CartInitialState} from "./types/cart-initial-state.interface";
import {createAction} from "../utils/reducer/reducer.utils";


const addCartItem = (cartItems: CartProduct[], product: Product) => {
  const existingCartItem = cartItems.find((cartItem: CartProduct) => cartItem.id === product.id);

  if (existingCartItem) {
    return cartItems.map((cartItem: CartProduct) =>
        cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [ ...cartItems, {...product, quantity: 1 }];
}

const removeCartItem = (cartItems: CartProduct[], product: Product) => {
  const existingCartItem = cartItems.find((cartItem: CartProduct) => cartItem.id === product.id);

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem: CartProduct) => cartItem.id !== product.id);
  }

  return cartItems.map((cartItem: CartProduct) =>
      cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

const clearCartItem = (cartItems: CartProduct[], product: Product) => {
  if (product.id)
  return cartItems.filter((cartItem: CartProduct) => cartItem.id !== product.id);
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (isOpened: boolean) => {},
  cartItems: [],
  addItemToCart: (product: CartProduct) => {},
  removeItemFromCart: (product: CartProduct) => {},
  clearItemFromCart: (product: CartProduct) => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE: CartInitialState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state: CartInitialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS :
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN :
      return {
        ...state,
        isCartOpen: payload,
      }
    default :
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }: any) => {
  const [ { cartItems, isCartOpen, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems: CartProduct[]) => {
    const newCartCount = newCartItems.reduce((total: number, cartItem: CartProduct) =>
        total + cartItem.quantity, 0);

    const newCartTotal = newCartItems.reduce((total: number, cartItem: CartProduct) =>
        total + (cartItem.quantity * cartItem.price), 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  }

  const setIsCartOpen = (value: boolean) =>
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value));

  const addItemToCart = (product: Product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (product: Product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (product: Product) => {
    const newCartItems = clearCartItem(cartItems, product);
    // @ts-ignore
    updateCartItemsReducer(newCartItems);
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  // @ts-ignore
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
