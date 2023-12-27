import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logos/logo-PhotoRoom.png";
import Hero from "../Hero/Hero";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="./" className="header__logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="header__links">
          <Link className="header__link">My Events</Link>
          <div className="header__links--account">
            <Link className="header__link">Login</Link>
            <Link className="header__link">Sign Up</Link>
          </div>
        </div>
      </nav>
      <Hero />
    </header>
  );
}
