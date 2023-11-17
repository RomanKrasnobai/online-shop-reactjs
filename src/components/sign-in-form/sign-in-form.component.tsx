import "./sign-in-form.styles.scss";
import {DefaultFormFields} from "../../interfaces/default-form-fields.interface";
import {useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {BUTTON_TYPES} from "../../interfaces/button-types.enum";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";


const defaultFormFields: Partial<DefaultFormFields> = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = () => dispatch(googleSignInStart());

  const handleSubmit = (event: any) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password');
        break;

        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;

        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email"
                   type="email"
                   required
                   onChange={handleChange}
                   name="email"
                   value={email}
        />
        <FormInput label="Password"
                   type="password"
                   required
                   onChange={handleChange}
                   name="password"
                   value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>

          <Button type="button"
                  buttonType={BUTTON_TYPES.google}
                  onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;
