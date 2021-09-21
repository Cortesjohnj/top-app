import {
  LOGIN_USER,
  ERROR,
  SET_PETS,
  DELETE_PET,
  REGISTER_USER,
  AUTHENTICATED,
  LOGOUT,
  NOT_AUTHENTICATED,
  ADD_PETS,
  UPDATE_PROFILE,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        status: AUTHENTICATED,
        error: "",
      };
    case ADD_PETS:
      return {
        ...state,
        pets: action.payload,
      };
    case SET_PETS:
      return {
        ...state,
        pets: action.payload,
      };

    case DELETE_PET:
      return {
        ...state,
        pets: state.pets.filter(pet => pet._id !== action.payload),
      };

    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        error: "",
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload,
        error: "",
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        status: NOT_AUTHENTICATED,
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
