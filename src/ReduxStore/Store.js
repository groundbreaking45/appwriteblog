import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";


const Store = configureStore({
 reducer : {
    auth : authReducers,
 }

})

export default Store;