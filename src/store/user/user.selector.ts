import {createSelector} from "reselect";
import {InitialState} from "../interfaces/initial-state.interface";

const selectUserReducer = (state: InitialState) => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
);
