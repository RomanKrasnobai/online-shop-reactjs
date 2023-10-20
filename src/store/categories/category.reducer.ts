import {CategoriesInitialState} from "./interfaces/categories-initial-state.interface";
import {CATEGORIES_ACTION_TYPES} from "./category.types";

const CATEGORIES_INITIAL_STATE: CategoriesInitialState = {
  categories: []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES :
      return {
        ...state,
        categories: payload,
      };

    default:
      return state;
  }
}
