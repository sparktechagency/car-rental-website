import { configureStore } from "@reduxjs/toolkit";
import { HomeApi } from "../src/features/Home_page/HomeApi";

const apis = [HomeApi];

export const store = configureStore({
  reducer: {
    ...Object.fromEntries(apis.map((api) => [api.reducerPath, api.reducer])),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.map((api) => api.middleware)),
});
