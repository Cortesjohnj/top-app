import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import "../assets/styles/LoginPage.css";
import { useDispatch } from "react-redux";
import { addUser } from "../actions";

const LoginPage = (props) => {
  const form = useRef(null);
  const dispatch = useDispatch();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login", {
        email: formState.values.email,
        password: formState.values.password,
      });
      localStorage.setItem("Authorization", response.data.token);
      dispatch(addUser(response.data.user));
      props.history.push("/");
    } catch (e) {
      setFormState((formState) => ({
        ...formState,
        errors: { code: e.response.status, message: e.response.data.error },
      }));
    }
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
          Don't you have an account? <Link to="/signup">Register</Link>
        </p>
      </section>
    </section>
  );
};

export default LoginPage;
