import axios from "../axios";
import {
  ERROR,
  LOGIN_USER,
  SET_PETS,
  DELETE_PET,
  SELECT_PET,
  LIST_REQUESTS,
  UPDATE_REQUEST,
  LIST_FOUNDATION_REQUESTS,
  REGISTER_USER,
  AUTHORIZATION,
  LOGOUT,
  ADD_PETS,
  UPDATE_PROFILE,
  BULK_REJECT_REQUESTS,
} from "./actions";
import history from "../history";

export const authUser = ({ email, password }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem(AUTHORIZATION, response.data.token);
      dispatch({ type: LOGIN_USER, payload: response.data });
      history.push("/");
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const loadUser = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/me");
      dispatch({ type: LOGIN_USER, payload: response.data });
    } catch (e) {
      localStorage.removeItem(AUTHORIZATION);
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const logOut = () => {
  localStorage.removeItem(AUTHORIZATION);
  return { type: LOGOUT };
};

export const listPets = (foundationId, page) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `/foundations/${foundationId}/pets?page=${page}`
      );
      //setFilteredPets(response.data);
      dispatch({ type: SET_PETS, payload: response.data });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const addPets = ({
  foundationId,
  photoUrl,
  petName,
  petAge,
  petDescription,
}) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(`/foundations/${foundationId}/pets`, {
        name: petName,
        age: petAge,
        description: petDescription,
      });

      dispatch({ type: ADD_PETS, payload: response.data });
      history.push(`/foundations/${foundationId}/pets`);
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const deletePet = (petId) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/pets/${petId}`);
      //setFilteredPets(response.data);
      dispatch({ type: DELETE_PET, payload: petId });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const selectPet = (petId) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/pets/${petId}`);

      let requests = await axios.get(`/pets/${petId}/requests`);
      dispatch({ type: SELECT_PET, payload: response.data });
      dispatch({ type: LIST_REQUESTS, payload: requests.data });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const updateRequest = (petId, requestId, status) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/pets/${petId}/requests/${requestId}`, {
        responseStatus: status,
      });
      dispatch({ type: UPDATE_REQUEST, payload: response.data });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const bulkReject = (petId, _id) => {
  return async function (dispatch) {
    try {
      await axios.put(`/pets/${petId}/requests`, { _id });
      dispatch({ type: BULK_REJECT_REQUESTS, payload: _id });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const listFoundationRequests = (foundationId) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/foundations/${foundationId}/requests`);
      dispatch({ type: LIST_FOUNDATION_REQUESTS, payload: response.data });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const registerUser = ({ firstName, email, password, role }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/signup", {
        name: firstName,
        email: email,
        password: password,
        role: role,
      });

      dispatch({ type: REGISTER_USER, payload: response.data.user });
      history.push("/login");
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const updateUserProfile = ({
  _id,
  name,
  role,
  address,
  email,
  phoneNumber,
  photoUrl,
}) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/${_id}/profile`, {
        _id,
        name,
        role,
        address,
        email,
        phoneNumber,
        photoUrl,
      });

      dispatch({ type: UPDATE_PROFILE, payload: response.data });

      // history.go(0);
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};
