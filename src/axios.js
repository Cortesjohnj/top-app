import axios from "axios";
import { AUTHORIZATION } from "./store/actions";

const customAxios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: localStorage.getItem(AUTHORIZATION),
  },
});

export default customAxios;
