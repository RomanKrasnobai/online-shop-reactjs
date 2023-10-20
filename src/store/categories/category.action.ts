import {createAction} from "../../utils/reducer/reducer.utils";
import {CATEGORIES_ACTION_TYPES} from "./category.types";
import {CategoriesMap} from "../../interfaces/categories-map.interface";

export const setCategories = (categories: CategoriesMap[]) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
