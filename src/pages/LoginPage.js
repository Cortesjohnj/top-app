import { useState, useRef } from "react";
import "../assets/styles/LoginPage.css";

const LoginPage = () => {
  const form = useRef(null);

  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        formData.get("email")
      )
    ) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    if (!emailError) {
      console.log("SEND FORM INFO AND REDIRECT TO LOGIN");
    }
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Login</h2>
        {emailError && <span>Invalid Email</span>}
        <form className="login__container--form" ref={form}>
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Password"
          />
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
