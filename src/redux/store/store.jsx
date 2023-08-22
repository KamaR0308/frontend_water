import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "../reducers/locationReducer";
import userSlice from "../reducers/usersReducer";


const reducer = combineReducers({
  locationSlice,
  userSlice
});

export const store = configureStore({
  reducer: reducer,
});
