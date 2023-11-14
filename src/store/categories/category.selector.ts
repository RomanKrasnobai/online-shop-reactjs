import {createSelector} from "reselect";
import {InitialState} from "../interfaces/initial-state.interface";

const selectCategoryReducer = (state: InitialState) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc: any, category: any) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
  }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categories) => categories.isLoading
);
