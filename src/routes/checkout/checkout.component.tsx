import {CartProduct} from "../../interfaces/product.interface";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
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
