import {UserInitialState} from "./interfaces/user-initial-state.interface";
import {USER_ACTION_TYPES} from "./user.types";

const USER_INITIAL_STATE: UserInitialState = {
  currentUser: null,
  isLoading: false,
  error: null,
}

export const userReducer = (state = USER_INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS :
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };

    case USER_ACTION_TYPES.SIGN_IN_FAILED :
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        error: payload,
      };
    case USER_ACTION_TYPES.SIGN_UP_FAILED :
      return { ...state, error: payload };

    case USER_ACTION_TYPES.SIGN_OUT_START :
      return {
        ...state,
        isLoading: true,
      }

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS :
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      }

    case USER_ACTION_TYPES.SIGN_OUT_FAILED :
      return {
        ...state,
        isLoading: false,
        error: payload
      };

    default :
      return state;
  }
}
