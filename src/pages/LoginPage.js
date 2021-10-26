import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/LoginPage.css";
import { useSelector, useDispatch } from "react-redux";
import { authUser, resetError } from "../store/actionCreators";

const LoginPage = () => {
  const form = useRef(null);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isInvalid: false,
    values: {},
  });

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const error = useSelector((state) => state.error);

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [event.target.name]: event.target.value },
    }));
  };

  const handleVerifyEmail = (event) => {
    const check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      event.target.value,
    );
    setFormState((formState) => ({
      ...formState,
      isInvalid: !check,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      authUser({
        email: formState.values.email || "",
        password: formState.values.password || "",
      }),
    );
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Login</h2>
        {formState.isInvalid && <span>*Invalid Email</span>}
        <form
          className="login__container--form"
          ref={form}
          data-testid="loginForm"
        >
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleVerifyEmail}
            data-testid="email"
          />
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            data-testid="password"
          />

          <button
            type="submit"
            className="button"
            onClick={handleSubmit}
            disabled={formState.isInvalid}
            data-testid="loginButton"
          >
            Login
          </button>
        </form>
        {!!error && <span>{error}</span>}
        <p className="login__container--register">
          Don't you have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </section>
    </section>
  );
};

export default LoginPage;
