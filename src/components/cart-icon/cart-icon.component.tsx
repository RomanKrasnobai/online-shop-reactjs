import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

const CardIcon = () => {
  const { isCartOpen , setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpe = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container"
         onClick={toggleIsCartOpe}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CardIcon;
