import {CategoriesMap} from "../../interfaces/categories-map.interface";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesError, fetchCategoriesSuccess} from "./category.action";
import {all, takeLatest, call, put} from 'redux-saga/effects';
import {CATEGORIES_ACTION_TYPES} from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    // @ts-ignore
    const categories: CategoriesMap[] = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesError(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
