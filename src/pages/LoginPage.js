import { useState, useRef } from "react";
import "../assets/styles/LoginPage.css";
import MockData from "../MockData";

const LoginPage = () => {
  const form = useRef(null);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    errors: {},
  });

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleVerifyEmail = (event) => {
    const check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      event.target.value
    );
    setFormState((formState) => ({
      ...formState,
      isValid: !check,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = MockData.users.filter(
      (user) => user.email === formState.email
    )[0];

    /*
      axios({
        method: 'GET',
        baseURL: 'https://APIURL,
        url: `/authenticate`
      })
      .then(() => {
        setValidatePassword(false);
        console.log('authenticated')
        props.history.push("/")
      })
      .catch(error =>{
        setValidatePassword(true))
        if (error.status === '401') ?
          setFormState((formState) => {
            ...formState,
            errors : {code : error.status, message: '*Invalid Credentials, please try again'}
          }) : setFormState((formState) => {
            ...formState,
            errors : {code : error.status, message:'*Unexpected error, please try again later'}
          })
      })
    */
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Login</h2>
        {formState.isValid && <span>*Invalid Email</span>}
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

          <button type="submit" className="button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        {!!formState.errors.code && <span>{formState.errors.message}</span>}
        <p className="login__container--register">
          Don't you have an account? <a href="/register">Register</a>
        </p>
      </section>
    </section>
  );
};

export default LoginPage;
