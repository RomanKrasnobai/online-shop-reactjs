import {createContext, useEffect, useState} from "react";
import {Product} from "../interfaces/product.interface";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
// import {addCollectionAndDocuments} from "../utils/firebase/firebase.utils";
// import SHOP_DATA from "../shop-data";
// import {Constants} from "../interfaces/constants";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }: any) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
    }
    getCategoriesMap();
  }, []);

  //create new 'categories' collection in Firestore database
  // useEffect(() => {
  //   addCollectionAndDocuments(Constants.DB_KEY_CATEGORIES, SHOP_DATA);
  // }, []);

  const value = { categoriesMap };

  // @ts-ignore
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
