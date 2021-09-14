import {
  LOGIN_USER,
  ERROR,
  SET_PETS,
  DELETE_PET,
  SELECT_PET,
  LIST_REQUESTS,
  UPDATE_REQUEST,
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

    case SELECT_PET:
      return {
        ...state,
        selectedPet: action.payload,
      };

    case LIST_REQUESTS:
      return {
        ...state,
        adoptionRequests: action.payload,
      };

    case UPDATE_REQUEST:
      return {
        ...state,
        adoptionRequests: state.adoptionRequests.map((req) =>
          req._id === action.payload._id
            ? { ...req, responseStatus: action.payload.responseStatus }
            : req
        ),
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
