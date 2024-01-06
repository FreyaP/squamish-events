import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import "./SignUp.scss";
import axios from "axios";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import signup from "../../assets/images/svgs/signup.svg";

export default function SignUp() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  document.title = `Squamish Events | Sign Up`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: e.target.email.value,
      user_name: e.target.name.value,
      password: e.target.password.value,
      role: "host",
    };
    axios
      .post(`${BASE_URL}/users`, newUser)
      .then(() => {
        setSuccess(true);
        setError("");
        e.target.reset();
        navigate("../login"); //update to suto login and user dashboard
      })
      .catch((error) => {
        setSuccess(false);
        setError(error);
      });
  };

  return (
    <>
      <Hero image={signup} title={`Sign up`} subtitle={`Then have more fun!`} />
      <section className="signup">
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__field">
            <label htmlFor="name" className="signup__label">
              Name
            </label>
            <input
              type="text"
              className="signup__input"
              id="name"
              name="name"
            />
          </div>
          <div className="signup__field">
            <label htmlFor="email" className="signup__label">
              Email
            </label>
            <input
              type="text"
              className="signup__input"
              id="email"
              name="email"
            />
          </div>
          <div className="signup__field">
            <label htmlFor="password" className="signup__label">
              Password
            </label>
            <input
              type="password"
              className="signup__input"
              id="password"
              name="password"
            />
          </div>
          <div className="signup__field">
            <label htmlFor="confirmPassword" className="signup__label">
              Confirm Password
            </label>
            <input
              type="password"
              className="signup__input"
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
          <button className="signup__button">Sign Up</button>
          {success && <div className="signup__message">You've signed up!</div>}
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
