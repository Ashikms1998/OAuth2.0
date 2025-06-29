import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: useReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export const persistor = persistStore(store);
