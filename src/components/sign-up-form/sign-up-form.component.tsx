import {useState} from "react";
import {DefaultFormFields} from "../../interfaces/default-form-fields.interface";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user.action";


const defaultFormFields: DefaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }

    try {
      // const { user }: any = await createAuthUserWithEmailAndPassword(email, password);
      dispatch(signUpStart(email, password, displayName));
      // await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        alert('The user is already exists');
      } else {
        console.log('The user creation encountered an error', error);
      }
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name"
                   type="text"
                   required
                   onChange={handleChange}
                   name="displayName"
                   value={displayName}

        />
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
        <FormInput label="Confirm Password"
                   type="password"
                   required
                   onChange={handleChange}
                   name="confirmPassword"
                   value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;
