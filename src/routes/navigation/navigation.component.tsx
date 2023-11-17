import {Outlet} from "react-router-dom";
import React from "react";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from './navigation.styles';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectCartIsOpen} from "../../store/cart/cart.selector";
import {signOutStart} from "../../store/user/user.action";


const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartIsOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          { currentUser ?
            (<NavLink as="span" to="/auth" onClick={signOutUser}>SIGN OUT</NavLink>) :
            (<NavLink to="/auth">SIGN IN</NavLink>)
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation;
