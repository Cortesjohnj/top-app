import reducer from "./reducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { LOADING, INITIALIZED } from "./actions";

const initialState = {
  user: {},
  foundations: [],
  pets: [],
  petListInfo: {},
  adoptionRequests: [],
  foundationRequests: [],
  userRequests: [],
  selectedPet: {},
  error: "",
  status: LOADING,
  errStatus: INITIALIZED,
  foundation: {},
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function createStoreApp() {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
