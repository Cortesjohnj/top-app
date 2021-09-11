import axios from "../axios";
import { ERROR, LOGIN_USER, SET_PETS, DELETE_PET } from "./actions";
import history from "../history";

export const deletePet = (payload) => ({
  type: DELETE_PET,
  payload,
});

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
      console.log(`/foundations/${foundationId}/pets`);
      let response = await axios.get(`/foundations/${foundationId}/pets`);
      //setFilteredPets(response.data);
      dispatch({ type: SET_PETS, payload: response.data });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};
