import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import "./SignUp.scss";
import axios from "axios";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import signup from "../../assets/images/svgs/signup.svg";
import validateEmail from "../../utils/ValidateEmail";

export default function SignUp({ loggedIn }) {
  const [error, setError] = useState();
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  document.title = `Squamish Events | Sign Up`;

  function handleInputChange(e) {
    e.preventDefault();

    if (e.target.name === "name") {
      e.target.value
        ? setFormErrors({
            ...formErrors,
            name: false,
          })
        : setFormErrors({
            ...formErrors,
            name: true,
          });
    }

    if (e.target.name === "email") {
      const isEmailValid = validateEmail(e.target.value);
      setFormErrors({
        ...formErrors,
        email: !isEmailValid,
      });
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "confirmPassword") {
      const isPasswordConfirmed = e.target.value === password;
      setFormErrors({
        ...formErrors,
        password: !isPasswordConfirmed,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(e.target.email.value);
    const isPasswordConfirmed =
      e.target.password.value === e.target.confirmPassword.value;
    if (!e.target.password.value || !e.target.name.value) {
      setError(`Please fill out all fields`);
      return;
    }
    if (!isEmailValid) {
      setFormErrors({
        ...formErrors,
        email: true,
      });
    }
    if (!isPasswordConfirmed || !e.target.password.value) {
      setFormErrors({
        ...formErrors,
        password: true,
      });
    }

    if (
      isEmailValid &&
      e.target.password.value &&
      isPasswordConfirmed &&
      e.target.name.value
    ) {
      setFormErrors({
        email: false,
        password: false,
        name: false,
      });
      const newUser = {
        email: e.target.email.value,
        user_name: e.target.name.value,
        password: e.target.password.value,
        role: "host",
      };
      await axios
        .post(`${BASE_URL}/users`, newUser)

        .then(() => {
          setSuccess(true);
          setError("");
          e.target.reset();
          navigate("../login"); // Future: update to auto login and user dashboard
        })
        .catch((error) => {
          setSuccess(false);
          setError(
            error?.response?.data?.error?.sqlMessage ||
              error?.response?.data?.message
          );
        });
    } else {
      setError(`Something went wrong`);
    }
  };
  if (loggedIn) {
    return (
      <Hero image={signup} title={`Sign up`} subtitle={`Logout to signup!`} />
    );
  } else if (!loggedIn) {
    return (
      <>
        <Hero
          image={signup}
          title={`Sign up`}
          subtitle={`Then have more fun!`}
        />
        <section className="signup">
          <form className="signup__form" onSubmit={handleSubmit}>
            <div className="signup__field">
              <label htmlFor="name" className="signup__label">
                Name
              </label>
              <input
                type="text"
                className={
                  formErrors.name ? "signup__input--error" : "signup__input"
                }
                id="name"
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="signup__field">
              <label htmlFor="email" className="signup__label">
                Email
              </label>
              <input
                type="text"
                className={
                  formErrors.email ? "signup__input--error" : "signup__input"
                }
                id="email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="signup__field">
              <label htmlFor="password" className="signup__label">
                Password
              </label>
              <input
                type="password"
                className={
                  formErrors.password ? "signup__input--error" : "signup__input"
                }
                id="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="signup__field">
              <label htmlFor="confirmPassword" className="signup__label">
                Confirm Password
              </label>
              <input
                type="password"
                className={
                  formErrors.password ? "signup__input--error" : "signup__input"
                }
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </div>
            <button className="signup__button">Sign Up</button>
            {success && (
              <div className="signup__message">You've signed up!</div>
            )}
            {error && <div className="signup__error">{error}</div>}
            <p className="signup__footer">
              Have an account?{" "}
              <Link className="signup__footer--link" to="/login">
                Log in
              </Link>
            </p>
          </form>
        </section>
      </>
    );
  }
}
