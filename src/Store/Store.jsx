import { configureStore } from "@reduxjs/toolkit";
import { StudentApi } from "../services/StudentApi";
export const store=configureStore({
  reducer:{
    [StudentApi.reducerPath]:StudentApi.reducer

  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(StudentApi.middleware),
});
export default store
