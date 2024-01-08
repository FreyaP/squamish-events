/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import "./Login.scss";
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import login from "../../assets/images/svgs/login.svg";
import validateEmail from "../../utils/ValidateEmail";

export default function Login({ setLoggedIn }) {
  const [error, setError] = useState();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  document.title = `Squamish Events | Login`;

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === "email" && e.target.value) {
      const isEmailValid = validateEmail(e.target.value);
      setFormErrors({
        ...formErrors,
        email: !isEmailValid,
      });
    }
    if (e.target.name === "password" && e.target.value) {
      setFormErrors({
        ...formErrors,
        password: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.email.value) {
      setFormErrors({
        ...formErrors,
        email: true,
      });
    }
    if (!e.target.password.value) {
      setFormErrors({
        ...formErrors,
        password: true,
      });
    }

    axios
      .post(`${BASE_URL}/users/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user_id", response.data.id);
        setLoggedIn(true);
        navigate(`/myaccount/${response.data.id}`);
      })
      .catch((error) => {
        console.log(error.response?.data);
        console.log(error);
        setError(error.response?.data);
        setError(error.message);
      });
  };

  return (
    <>
      <Hero image={login} title={`Login`} />

      <section className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="text"
              className={
                formErrors.email ? "signup__input--error" : "signup__input"
              }
              name="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              className={
                formErrors.password ? "signup__input--error" : "signup__input"
              }
              name="password"
              id="password"
              onChange={handleInputChange}
            />
          </div>
          <button className="login__button">Login</button>
          {error && <div className="login__error">{error}</div>}
          <p className="login__footer">
            Need an account?{" "}
            <Link className="login__footer--link" to="../signup">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}
