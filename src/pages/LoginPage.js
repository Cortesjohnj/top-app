import { useState, useRef } from "react";

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
    <section>
      <section className="login__container">
        <h2>Inicia sesión</h2>
        <form className="login__container--form" ref={form}>
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Correo"
          />
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Contraseña"
          />
          <button type="submit" className="button" onClick={handleSubmit}>
            Iniciar sesión
          </button>
          <div className="login__container--remember-me">
            <a href="/">Olvidé mi contraseña</a>
          </div>
        </form>
        <p className="login__container--register">
          No tienes ninguna cuenta <a href="/register">Regístrate</a>
        </p>
      </section>
    </section>
  );
};

export default LoginPage;
