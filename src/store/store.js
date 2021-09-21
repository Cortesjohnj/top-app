import reducer from "./reducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { LOADING, INITIALIZED } from "./actions";

const initialState = {
  user: {},
  foundations: [],
  pets: [],
  adoptionRequests: [],
  foundationRequests: [],
  selectedPet: {},
  error: "",
  status: LOADING,
  errStatus: INITIALIZED,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
