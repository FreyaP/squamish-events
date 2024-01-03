/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logos/logo-PhotoRoom.png";
import { useEffect } from "react";

export default function Header({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    token ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    setLoggedIn(false);
    navigate("./");
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="./" className="header__logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="header__links">
          <Link
            to={`./myaccount/${sessionStorage.getItem("user_id")}`}
            className="header__link"
          >
            My Events
          </Link>
          <div className="header__links--account">
            {loggedIn ? (
              <p className="header__link" onClick={handleLogout}>
                Logout
              </p>
            ) : (
              <Link to="./login" className="header__link">
                Login
              </Link>
            )}

            <Link to="./signup" className="header__link">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
