import {UserInitialState} from "./interfaces/user-initial-state.interface";
import {USER_ACTION_TYPES} from "./user.types";

const USER_INITIAL_STATE: UserInitialState = {
  currentUser: null,
}

export const userReducer = (state = USER_INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER :
      return {
        ...state,
        currentUser: payload
      };

    default :
      return state;
  }
}
