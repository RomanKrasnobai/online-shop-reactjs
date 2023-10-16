import {CartProduct} from "../../interfaces/product.interface";

export interface CartInitialState {
  isCartOpen: boolean;
  cartItems: CartProduct[];
  cartCount: number
  cartTotal: number;
}
