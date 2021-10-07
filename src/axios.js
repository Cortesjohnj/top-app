import axios from "axios";
// import { AUTHORIZATION } from "./store/actions";
const { REACT_APP_URL } = process.env;
const customAxios = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: REACT_APP_URL,
  // headers: {
  //   Authorization: localStorage.getItem(AUTHORIZATION),
  // },
});

export default customAxios;
