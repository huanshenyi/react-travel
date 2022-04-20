import { createStore, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendPoductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendPoducts: recommendPoductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
});

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
