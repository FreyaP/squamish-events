import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import "./Login.scss";
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/users/login`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user_id", response.data.id);

        navigate(`/myaccount/${response.data.id}`);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <>
      <Hero />

      <section className="login">
        <h1 className="login__title">Login</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="text"
              className="login__input"
              name="email"
              id="email"
            />
          </div>
          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              className="login__input"
              name="password"
              id="password"
            />
          </div>
          <button className="login__button">Login</button>
          {error && <div className="login__error">{error}</div>}
        </form>
        <p>
          Need an account? <Link to="../signup">Sign Up</Link>
        </p>
      </section>
    </>
  );
}
