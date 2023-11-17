import {createAction} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES} from "./category.types";
import {CategoriesMap} from "../../interfaces/categories-map.interface";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories: CategoriesMap[]) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesError = (error: any) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
