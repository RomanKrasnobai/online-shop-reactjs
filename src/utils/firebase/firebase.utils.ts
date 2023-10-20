import {initializeApp} from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch} from "firebase/firestore";
import {Constants} from "../../interfaces/constants";


const firebaseConfig = {
  apiKey: "AIzaSyDyP2eBna7csTDNbAIu9jSSF41BS4Ht5fU",
  authDomain: "crwn-clothing-db-216c4.firebaseapp.com",
  projectId: "crwn-clothing-db-216c4",
  storageBucket: "crwn-clothing-db-216c4.appspot.com",
  messagingSenderId: "195216856835",
  appId: "1:195216856835:web:86b587a66fac5756ecfb36"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const sighInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: any) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object: any) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

export const createUserDocumentFromAuth = async (userAuth: any, additionalInfo?: {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(
        userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (e) {
      console.log('error creating a user', e);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string | undefined, password: string | undefined) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: any) => onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, Constants.DB_KEY_CATEGORIES);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}
