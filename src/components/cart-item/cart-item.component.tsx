import {CartProduct} from "../../interfaces/product.interface";
import "./cart-item.styles.scss";

const CartItem = ({cartItem}: any) => {
  const { name, imageUrl, quantity, price }: CartProduct = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">{quantity} x ${price}</span>
      </div>
    </div>
  )
}

export default CartItem;
