import React from "react";
import {Category} from "../../interfaces/category.interface";
import {BackGroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";

const DirectoryItem = ({category}: any) => {
  const { title, imageUrl, route }: Category = category;
  const navigate = useNavigate();

  // @ts-ignore
  const onNavigateHandler = () => navigate(route);

  return(
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackGroundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}
export default DirectoryItem;
