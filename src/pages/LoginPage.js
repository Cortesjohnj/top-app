import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles/LoginPage.css";
import MockData from "../MockData";

const LoginPage = (props) => {
  const form = useRef(null);

  const [formState, setFormState] = useState({
    isInvalid: false,
    values: {},
    errors: {},
  });

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [event.target.name]: event.target.value },
    }));
  };

  const handleVerifyEmail = (event) => {
    const check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      event.target.value
    );
    setFormState((formState) => ({
      ...formState,
      isInvalid: !check,
    }));
  };

  const handleSubmit = (event) => {
    console.log("done");
    event.preventDefault();
    const user = MockData.users.filter(
      (user) => user.email === formState.email
    )[0];

    axios({
      method: "POST",
      baseURL: "https://jsonplaceholder.typicode.com",
      url: `/posts`,
      data: {
        email: formState.values.email,
        body: formState.values.password,
      },
    })
      .then(() => {
        console.log("Authenticated! Now rediect to home page");
        props.history.push("/");
      })
      .catch((error) => {
        error.status === "401"
          ? setFormState((formState) => ({
              ...formState,
              errors: {
                code: error.status,
                message: "*Invalid Credentials, please try again",
              },
            }))
          : setFormState((formState) => ({
              ...formState,
              errors: {
                code: error.status,
                message: "*Unexpected error, please try again later",
              },
            }));
      });
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Login</h2>
        {formState.isInvalid && <span>*Invalid Email</span>}
        <form className="login__container--form" ref={form}>
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleVerifyEmail}
          />
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="button"
            onClick={handleSubmit}
            disabled={formState.isInvalid}
          >
            Login
          </button>
        </form>
        {!!formState.errors.code && <span>{formState.errors.message}</span>}
        <p className="login__container--register">
          Don't you have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </section>
  );
};

export default LoginPage;
