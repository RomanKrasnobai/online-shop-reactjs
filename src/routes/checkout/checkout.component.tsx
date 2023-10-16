import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";
import {CartProduct} from "../../interfaces/product.interface";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const header: string[] = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {header.map((item: string) => {
          return (
            <div className="header-block" key={item}>
              <span>{item}</span>
            </div>
          )})
        }
      </div>

      {cartItems.map((cartItem: CartProduct) =>
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      )}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  )
}

export default Checkout;
