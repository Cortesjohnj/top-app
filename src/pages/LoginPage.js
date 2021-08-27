import { useState, useRef } from "react";
import "../assets/styles/LoginPage.css";
import MockData from "../MockData";

const LoginPage = () => {
  const form = useRef(null);

  const [formState, setFormState] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleVerifyEmail = (event) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
    ) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleSubmit = (event) => {
    console.log(MockData);
    event.preventDefault();
    const user = MockData.users.filter(
      (user) => user.email === formState.email
    )[0];

    ////////////RHTTP REQUEST TO  API TO VALIDATE PASSWORD
    console.log("VALIDATE PASSWORD");

    if (!emailError && !validatePassword) {
      ////////////////////////
      console.log("REDIRECT TO HOMEPAGE");
    }
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Login</h2>
        {emailError && <span>*Invalid Email</span>}
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
          {validatePassword && (
            <span>*Invalid Credentials, please try again</span>
          )}
          <button type="submit" className="button" onClick={handleSubmit}>
            Login
          </button>
        </form>

        <p className="login__container--register">
          Don't you have an account? <a href="/register">Register</a>
        </p>
      </section>
    </section>
  );
};

export default LoginPage;
