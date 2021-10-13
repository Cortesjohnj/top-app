import axios from "axios";
const { REACT_APP_URL } = process.env;

const customAxios = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8080",
  // baseURL: "https://adogta-backend-make-it-real.herokuapp.com",
  // headers: {
  //   Authorization: localStorage.getItem(AUTHORIZATION),
  // },
=======
  baseURL: REACT_APP_URL,
>>>>>>> fda8abd66b5dd1bb7198e6634594f4dda365a438
});

export default customAxios;
