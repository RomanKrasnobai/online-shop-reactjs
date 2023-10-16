import {createContext, SetStateAction, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";
import {User} from "../interfaces/user.interface";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user: User | null) => null,
});

export const UserProvider = ({children}: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: SetStateAction<null>) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // @ts-ignore
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
