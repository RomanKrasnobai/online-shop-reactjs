import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
import {Categories} from "../interfaces/categories.interface";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }: any) => {
  const [categoriesMap, setCategoriesMap] = useState<Categories>({
    hats: [],
    jackets: [],
    mens: [],
    sneakers: [],
    womens: []
  });

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap: Categories = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  // @ts-ignore
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
