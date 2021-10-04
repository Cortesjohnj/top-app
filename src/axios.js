import axios from "axios";
<<<<<<< HEAD
=======
import { AUTHORIZATION } from "./store/actions";
>>>>>>> 08dc689d3e2c95ef77b1159f2d0d6edf16c0dd9f

const customAxios = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://adogta-backend-make-it-real.herokuapp.com",
<<<<<<< HEAD
  // headers: {
  //   Authorization: localStorage.getItem(AUTHORIZATION),
  // },
=======
  headers: {
    Authorization: localStorage.getItem(AUTHORIZATION),
  },
>>>>>>> 08dc689d3e2c95ef77b1159f2d0d6edf16c0dd9f
});

export default customAxios;
