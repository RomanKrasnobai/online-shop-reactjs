import {createContext, useEffect, useState} from "react";
import {CartProduct, Product} from "../interfaces/product.interface";


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

export const CartProvider = ({ children }: any) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total: number, cartItem: CartProduct) =>
        total + cartItem.quantity, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total: number, cartItem: CartProduct) =>
        total + (cartItem.quantity * cartItem.price), 0);

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product: Product) => {
    // @ts-ignore
    setCartItems(addCartItem(cartItems, product));
  }

  const removeItemFromCart = (product: Product) => {
    // @ts-ignore
    setCartItems(removeCartItem(cartItems, product));
  }

  const clearItemFromCart = (product: Product) => {
    // @ts-ignore
    setCartItems(clearCartItem(cartItems, product));
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
