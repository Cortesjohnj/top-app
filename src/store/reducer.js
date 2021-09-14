import { LOGIN_USER, ERROR, REGISTER_USER } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        error: "",
      };

    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        error: "",
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
