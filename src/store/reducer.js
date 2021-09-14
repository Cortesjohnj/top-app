import {
  LOGIN_USER,
  ERROR,
  SET_PETS,
  DELETE_PET,
  REGISTER_USER,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        error: "",
      };

    case SET_PETS:
      return {
        ...state,
        pets: action.payload,
      };

    case DELETE_PET:
      return {
        ...state,
        pets: state.pets.filter((pet) => pet._id !== action.payload),
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
