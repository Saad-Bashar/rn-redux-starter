import { apiSlice } from './dogs-api-slice';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from './counterSlice'
import themeReducer from './themeSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

