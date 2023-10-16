import {createContext, SetStateAction, useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";
import {User} from "../interfaces/user.interface";
import {UserInitialState} from "./types/user-initial-state.interface";
import {createAction} from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user: User | null) => null,
});

const INITIAL_STATE: UserInitialState = {
  currentUser: null,
}

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER' : 'SET_CURRENT_USER'
};

const userReducer = (state: UserInitialState, action: any) => {
  const { type, payload } = action;

 switch (type) {
   case USER_ACTION_TYPES.SET_CURRENT_USER :
    return {
      ...state,
      currentUser: payload
    };

   default :
     throw new Error(`Unhandled type ${type} in userReducer`);
 }
}

export const UserProvider = ({children}: any) => {
  const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: any) =>
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

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
