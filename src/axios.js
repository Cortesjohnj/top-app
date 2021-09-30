import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://adogta-backend-make-it-real.herokuapp.com",
  // headers: {
  //   Authorization: localStorage.getItem(AUTHORIZATION),
  // },
});

export default customAxios;
