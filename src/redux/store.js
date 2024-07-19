import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertSlice";
import { userSlice } from "./userSlice";
import { doctorSlice } from "./doctorSlice";

const rootReducer = combineReducers({
  alerts: alertSlice.reducer,
  user: userSlice.reducer,
  doctor: doctorSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
