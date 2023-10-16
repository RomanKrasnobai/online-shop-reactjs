import "./category-preview.styles.scss";
import {Product} from "../../interfaces/product.interface";
import ProductCard from "../product-card/poduct-card.component";


const CategoryPreview = ({ title, products }: any) => {
  return (
      <div className="category-preview-container">
        <h2>
          <span className="title">{title.toUpperCase()}</span>
        </h2>
        <div className="preview">
          {
            products
                .filter((_: Product, index: number) => index < 4)
                .map((product: Product) => <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>
  )
}

export default CategoryPreview;
