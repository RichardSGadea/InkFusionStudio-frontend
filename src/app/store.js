import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userSlice from "./Slices/userSlice";


const reducers = combineReducers({
    //Slices put here
    user: userSlice
});

const persistConfig = {
    key:"root",
    storage,
}

const persistedReducer = persistReducer(persistConfig,reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk)
})