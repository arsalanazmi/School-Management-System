import { compose, applyMiddleware, createStore, combineReducers } from "redux";

import thunk from "redux-thunk";
import AuthReducer from "./Reducer/AuthReducer";
import AuthMiddleware from "./Middleware/AuthMiddleware";

import StudentReducer from "./Reducer/StudentReducer";
import StudentMiddleware from "./Middleware/StudentMiddleware";

const middleware = applyMiddleware(thunk);
export { AuthMiddleware,StudentMiddleware };

export const rootReducer = combineReducers({
  AuthReducer,
  StudentReducer
});

export let store = createStore(
  rootReducer,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);