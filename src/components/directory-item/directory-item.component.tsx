import React from "react";
import './category-item.styles.scss';
import {Category} from "../../interfaces/category.interface";

const CategoryItem = ({category}: any) => {
  const { title, imageUrl }: Category = category;

  return(
    <div className="category-container">
      <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}/>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  )
}
export default CategoryItem;
