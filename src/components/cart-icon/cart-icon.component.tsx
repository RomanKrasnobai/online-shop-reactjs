import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartIconContainer, ItemCount, ShoppingIcon} from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen , setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpe = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer
         onClick={toggleIsCartOpe}
    >
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;
