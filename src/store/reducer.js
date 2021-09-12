import { LOGIN_USER, ERROR, ISUSER } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
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

    case ISUSER: {
      return {
        ...state,
        isUser: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
