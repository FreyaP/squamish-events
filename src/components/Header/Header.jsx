import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logos/logo-PhotoRoom.png";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="./">{logo}</Link>
      </nav>
    </header>
  );
}
