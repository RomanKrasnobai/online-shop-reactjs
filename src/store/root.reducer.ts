import {combineReducers} from "redux";
import {userReducer} from "./user/user.reducer";
import {categoriesReducer} from "./categories/category.reducer";
import {cartReducer} from "./cart/cart.reducer";
import {InitialState} from "./interfaces/initial-state.interface";

export const rootReducer = combineReducers<InitialState>({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
