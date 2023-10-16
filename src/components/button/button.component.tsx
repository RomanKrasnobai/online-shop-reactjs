import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";
import {BUTTON_TYPES} from "../../interfaces/button-types.enum";

const getButton = (buttonType = BUTTON_TYPES.base) => (
  {
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSignInButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
  }[buttonType]
)

const Button = ({children, buttonType, ...otherProps}: any) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
}

export default Button;
