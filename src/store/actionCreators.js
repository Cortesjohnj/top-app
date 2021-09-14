import axios from "../axios";
import {
  ERROR,
  LOGIN_USER,
  SET_PETS,
  DELETE_PET,
  SELECT_PET,
  LIST_REQUESTS,
  UPDATE_REQUEST,
} from "./actions";
import history from "../history";

export const authUser = ({ email, password }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("Authorization", response.data.token);
      dispatch({ type: LOGIN_USER, payload: response.data.user });
      history.push("/");
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const listPets = (foundationId) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/foundations/${foundationId}/pets`);
      //setFilteredPets(response.data);
      dispatch({ type: SET_PETS, payload: response.data });
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
      console.log(requests.data);
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
