import {CartProduct} from "../../../interfaces/product.interface";

export interface CartInitialState {
  isCartOpen: boolean;
  cartItems: CartProduct[];
}
