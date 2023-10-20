import {InitialState} from "../interfaces/initial-state.interface";
import {createSelector} from "reselect";
import {CartProduct} from "../../interfaces/product.interface";

const selectCartReducer = (state: InitialState) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total: number, cartItem: CartProduct) =>
        total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total: number, cartItem: CartProduct) =>
        total + (cartItem.quantity * cartItem.price), 0)
)

export const selectCartIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);
