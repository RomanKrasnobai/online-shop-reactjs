import {createAction} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES} from "./cart.types";
import {CartProduct, Product} from "../../interfaces/product.interface";

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


export const addItemToCart = (cartItems: CartProduct[], product: Product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems: CartProduct[], product: Product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems: CartProduct[], product: Product) => {
  const newCartItems = clearCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const setIsCartOpen = (value: boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value);
