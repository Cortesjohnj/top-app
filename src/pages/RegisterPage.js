import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../assets/styles/RegisterForm.css";
import { PrimaryButton } from "../components/PrimaryButton";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actionCreators";

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <section className="register">
      <div className="register__container">
        <h2 className="register__container--title">Sign up to continue:</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="register__container--form"
          data-testid="form"
        >
          {errors?.name?.type === "required" && (
            <p className="register__container--form--errors">
              *A name is required
            </p>
          )}
          {errors?.name?.type === "maxLength" && (
            <p className="register__container--form--errors">
              *A name cannot exceed 40 characters
            </p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form__field"
            data-testid="name"
            {...register("name", {
              required: true,
              maxLength: 40,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="register__container--form--errors">
              *Email is required
            </p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="register__container--form--errors">
              *Please enter a valid email.
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form__field"
            data-testid="email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />

          {errors?.password?.type === "required" && (
            <p className="register__container--form--errors">
              *You must specify a password
            </p>
          )}
          {errors?.password?.type === "pattern" && (
            <p className="register__container--form--errors">
              *Password must be at least 8 characters, one uppercase with one
              lowercase & one numeric character
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="form__field"
            data-testid="password"
            {...register("password", {
              required: true,
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            })}
          />
          {errors?.confirmPassword?.type === "required" && (
            <p className="register__container--form--errors">
              *You must confirm the password
            </p>
          )}
          {errors?.confirmPassword && (
            <p className="register__container--form--errors">
              {errors.confirmPassword.message}
            </p>
          )}
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            className="form__field"
            data-testid="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: value =>
                value === password.current || "The passwords do not match",
            })}
          />
          <h3 className="register__container--subtitle">Sign up as:</h3>
          {errors?.role?.type === "required" && (
            <p className="register__container--form--errors">
              *You must select one
            </p>
          )}
          <div className="register__container--form--options">
            <label className="register__container--form--options--label">
              User
              <input
                type="radio"
                name="user"
                value="user"
                data-testid="user"
                className="register__container--form--options--input"
                {...register("role", {
                  required: true,
                })}
              />
            </label>
            <label className="register__container--form--options--label">
              Foundation
              <input
                type="radio"
                name="foundation"
                value="foundation"
                data-testid="foundation"
                className="register__container--form--options--input"
                {...register("role", {
                  required: true,
                })}
              />
            </label>
          </div>
          {errors?.terms?.type === "required" && (
            <p className="register__container--form--errors">
              *You must agree to the terms & conditions
            </p>
          )}
          <label className="termsAndConditions register__container--form--options--label">
            <input
              type="checkbox"
              name="terms"
              className="termsAndConditions--input"
              data-testid="terms"
              {...register("terms", {
                required: true,
              })}
            />
            I agree to the{" "}
            <a className="termsAndConditions--link" href="/">
              {" "}
              terms & conditions
            </a>
          </label>
          <div className="buttomForm">
            <PrimaryButton
              children={"Sign up"}
              color={"primaryButton registerForm"}
              data-testid="submitButton"
            />
          </div>
        </form>
        <h4 className="register__container--Endtitle">
          Already a member? <Link to="/login">Log in </Link>
        </h4>
      </div>
    </section>
  );
}

export default RegisterPage;
