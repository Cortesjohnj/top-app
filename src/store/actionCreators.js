import axios from "../axios";
import {
  ERROR,
  LOGIN_USER,
  SET_PETS,
  DELETE_PET,
  REGISTER_USER,
  AUTHORIZATION,
  LOGOUT,
  ADD_PETS,
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
      dispatch({ type: LOGIN_USER, payload: response.data.user });
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
  history.push("/");
  localStorage.removeItem(AUTHORIZATION);
  return { type: LOGOUT };
};

export const listPets = foundationId => {
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

export const deletePet = petId => {
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

export const registerUser = ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
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
