import { configureStore } from "@reduxjs/toolkit";
import authService from '../features/auth/authService';
import authReducer from "./reducers/authReducer";
import placeService from "../features/place/placeService";


export const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [placeService.reducerPath]: placeService.reducer,
        authReducer: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authService.middleware)
    .concat(placeService.middleware)
})