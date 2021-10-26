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
  CREATE_ADOPTION_REQUEST,
  LIST_USER_REQUESTS,
  RESET_ERROR,
  SET_FOUNDATION,
} from "./actions";
import history from "../history";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const verifiedEmail = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/verified/${token}`);

      localStorage.setItem(AUTHORIZATION, response.data.token);
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem(AUTHORIZATION);
      dispatch({ type: LOGIN_USER, payload: response.data.user });
      history.push("/");
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};
export const authUser = ({ email, password }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem(AUTHORIZATION, response.data.token);
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem(AUTHORIZATION);
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
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem(AUTHORIZATION);
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
        `/foundations/${foundationId}/pets?page=${page}`,
      );
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
      const formData = new FormData();
      formData.append("name", petName);
      formData.append("age", petAge);
      formData.append("description", petDescription);
      photoUrl.forEach((image) => {
        formData.append("photoUrl", image);
      });
      const response = await axios.post(
        `/foundations/${foundationId}/pets`,
        formData,
      );
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

export const registerUser = ({ name, email, password, role }) => {
  return async function (dispatch) {
    const MySwal = withReactContent(Swal);

    const emailVerificationMessage = () => {
      MySwal.fire({
        title: <strong>Please verify your email!</strong>,
        html: <i>Check your inbox!</i>,
        icon: "success",
      });
    };

    const emailVerificationMessageError = () => {
      MySwal.fire({
        title: <strong>Oops...!</strong>,
        html: <i>Email is already taken!</i>,
        icon: "error",
      });
    };
    try {
      const response = await axios.post("/signup", {
        name: name,
        email: email,
        password: password,
        role: role,
      });

      dispatch({ type: REGISTER_USER, payload: response.data.user });
      history.push("/");
      emailVerificationMessage();
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
      emailVerificationMessageError();
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
  imageFile,
}) => {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("_id", _id);
      formData.append("name", name);
      formData.append("role", role);
      address && formData.append("address", address);
      formData.append("email", email);
      phoneNumber && formData.append("phoneNumber", phoneNumber);
      formData.append("photoUrl", photoUrl);
      const response = await axios.put(`/${_id}/profile`, formData);
      dispatch({ type: UPDATE_PROFILE, payload: response.data });

      // history.go(0);
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const createAdoption = ({
  petId,
  userId,
  description,
  phoneNumber,
  address,
}) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/pets/${petId}/request`, {
        petId: petId,
        userId: userId,
        description: description,
        phoneNumber: phoneNumber,
        address: address,
      });

      dispatch({ type: CREATE_ADOPTION_REQUEST, payload: response.data });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const listUserRequests = (userId) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${userId}/requests`);
      dispatch({ type: LIST_USER_REQUESTS, payload: response.data });
    } catch (e) {
      dispatch({ type: ERROR, payload: e.response.data.error });
    }
  };
};

export const setFoundation = (payload) => {
  return {
    type: SET_FOUNDATION,
    payload,
  };
};
