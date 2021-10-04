import axios from "axios";
import { AUTHORIZATION } from "./store/actions";

const customAxios = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://adogta-backend-make-it-real.herokuapp.com",
  // headers: {
  //   Authorization: localStorage.getItem(AUTHORIZATION),
  // },
});

export default customAxios;
