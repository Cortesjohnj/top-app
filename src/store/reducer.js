import {
  LOGIN_USER,
  ERROR,
  SET_PETS,
  DELETE_PET,
  SELECT_PET,
  LIST_REQUESTS,
  UPDATE_REQUEST,
  LIST_FOUNDATION_REQUESTS,
  REGISTER_USER,
  AUTHENTICATED,
  LOGOUT,
  NOT_AUTHENTICATED,
  ADD_PETS,
  UPDATE_PROFILE,
  BULK_REJECT_REQUESTS,
  CREATE_ADOPTION_REQUEST,
  FINISHED,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      const { _id, name, email, role, address, photoUrl, phoneNumber } =
        action.payload;
      return {
        ...state,
        user: { _id, name, email, role, address, photoUrl, phoneNumber },
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
        pets: action.payload.pets,
        petListInfo: {
          count: action.payload.count,
          page: +action.payload.page,
        },
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

    case LIST_FOUNDATION_REQUESTS:
      return {
        ...state,
        foundationRequests: action.payload,
      };

    case UPDATE_REQUEST:
      return {
        ...state,
        adoptionRequests: state.adoptionRequests.map(req =>
          req._id === action.payload._id
            ? { ...req, responseStatus: action.payload.responseStatus }
            : req
        ),
      };

    case BULK_REJECT_REQUESTS:
      return {
        ...state,
        adoptionRequests: state.adoptionRequests.map(req =>
          req._id !== action.payload
            ? { ...req, responseStatus: "rejected" }
            : req
        ),
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
        errStatus: FINISHED,
      };

    default:
      return state;

    case CREATE_ADOPTION_REQUEST:
      return {
        ...state,
        adoptionRequests: action.payload,
        error: "",
        errStatus: FINISHED,
      };
  }
};

export default reducer;
