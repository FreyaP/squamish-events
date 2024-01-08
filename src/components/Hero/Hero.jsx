/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Hero.scss";

export default function Hero({ image, title, subtitle, link, link_name }) {
  return (
    <div className="hero">
      <img src={image} className="hero__image" />
      <div className="hero__titles">
        <h1 className="hero__title">{title}</h1>
        <h2 className="hero__subtitle">{subtitle}</h2>
        <Link to={link}>{link_name}</Link>
      </div>
    </div>
  );
}
