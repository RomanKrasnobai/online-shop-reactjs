import {UserInitialState} from "../user/interfaces/user-initial-state.interface";
import {CategoriesInitialState} from "../categories/interfaces/categories-initial-state.interface";
import {CartInitialState} from "../cart/interfaces/cart-initial-state.interface";

export interface InitialState {
  user: UserInitialState;
  categories: CategoriesInitialState;
  cart: CartInitialState;
}
