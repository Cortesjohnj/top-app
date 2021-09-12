import reducer from "./reducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  user: {},
  foundations: [],
  pets: [],
  adoptionRequests: [],
  error: "",
  isUser: false,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
