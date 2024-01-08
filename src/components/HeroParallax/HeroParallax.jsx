/* eslint-disable react/prop-types */

import "./HeroParallax.scss";
import arrow from "../../assets/images/icons/down.svg";

export default function HeroParallax({ image, title, subtitle }) {
  return (
    <header className="hero-parallax">
      <img src={image} className=" background" />
      <div className="hero__titles foreground">
        <h1 className="hero-parallax__title">{title}</h1>
        <h2 className="hero-parallax__subtitle">{subtitle}</h2>
        <img src={arrow} alt="down arrow" className="hero-parallax__icon" />
      </div>
    </header>
  );
}
