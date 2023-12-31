import {CategoriesMap} from "../../../interfaces/categories-map.interface";

export interface CategoriesInitialState {
  categories: CategoriesMap[];
  isLoading: boolean;
  error: string | null;
}
