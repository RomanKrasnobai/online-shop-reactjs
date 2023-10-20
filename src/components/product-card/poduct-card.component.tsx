import Button from "../button/button.component";
import {BUTTON_TYPES} from "../../interfaces/button-types.enum";
import {Product} from "../../interfaces/product.interface";
import "./product-card.styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";


const ProductCard = ({ product }: any) => {
  const { imageUrl, name, price }: Product = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPES.inverted} onClick={addProductToCart}>Add to card</Button>
    </div>
  )
}

export default ProductCard;
