import "./category.styles.scss";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductCard from "../../components/product-card/poduct-card.component";
import {Product} from "../../interfaces/product.interface";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/category.selector";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);

  // @ts-ignore
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // @ts-ignore
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return(
    <>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      <div className="category-container">
        { products &&
          products.map((product: Product) => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </>
  )
}

export default Category;
