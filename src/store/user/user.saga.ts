import {all, takeLatest, call, put} from 'redux-saga/effects';
import {USER_ACTION_TYPES} from "./user.types";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  sighInWithGooglePopup,
  signInAuthUserWithEmailAndPassword, signOutUser
} from "../../utils/firebase/firebase.utils";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess} from "./user.action";


export function* getSnapshotFromUserAuth(userAuth: any, additionDetails?: {}) {
  try {
    // @ts-ignore
    const userSnapshot: any = yield call(createUserDocumentFromAuth, userAuth, additionDetails);

    yield put(
      signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch(err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(sighInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithEmail({ email, password }: { email: string, password: string }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signUp({ email, password, displayName }: { email: string, password: string, displayName: any }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (err) {
    yield put(signUpFailed(err));
  }
}

export function* isUserAuthenticated() {
  try {
    // @ts-ignore
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailed(err));
  }
}

export function* signInAfterSignUp({ user, additionalDetails }: { user: string, additionalDetails: any }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  // @ts-ignore
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpSuccess() {
  // @ts-ignore
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
  // @ts-ignore
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
