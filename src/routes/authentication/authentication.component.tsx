import {
  createUserDocumentFromAuth,
  sighInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoggleUser = async () => {
    const { user } = await sighInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <>
      <div>sign in</div>
      <button onClick={logGoggleUser}>Sign in with Goggle</button>

      <SignUpForm />
    </>
  )
}

export default SignIn;
