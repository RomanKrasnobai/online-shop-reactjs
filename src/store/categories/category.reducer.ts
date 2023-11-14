import {CategoriesInitialState} from "./interfaces/categories-initial-state.interface";
import {CATEGORIES_ACTION_TYPES} from "./category.types";

const CATEGORIES_INITIAL_STATE: CategoriesInitialState = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START :
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS :
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED :
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
}
