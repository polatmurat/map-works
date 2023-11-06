import { configureStore } from "@reduxjs/toolkit";
import authService from '../features/auth/authService';
import authReducer from "./reducers/authReducer";
import placeService from "../features/place/placeService";
import categoryService from "../features/category/categoryService";
import globalReducer from "./reducers/globalReducer";


export const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [placeService.reducerPath]: placeService.reducer,
        [categoryService.reducerPath]: categoryService.reducer,
        globalReducer: globalReducer,
        authReducer: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authService.middleware)
    .concat(placeService.middleware)
    .concat(categoryService.middleware)
})