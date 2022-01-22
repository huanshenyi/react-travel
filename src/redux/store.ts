import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from "./language/languageReducer";
import recommendPoductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";

const rootReducer = combineReducers({
    language: languageReducer,
    recommendPoducts: recommendPoductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>

export default store;