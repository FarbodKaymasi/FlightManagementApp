import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { combineReducers } from "redux";
import flightsReducer from "./slices/flightsSlice"; // Your flights reducer

// Redux Persist configuration
const persistConfig = {
  key: "root", // Key for the persisted storage
  storage, // Use localStorage
};

// Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  flights: flightsReducer,
});

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
