import "./Hero.scss";
import hero from "../../assets/images/svgs/hero.svg";

export default function Hero() {
  return (
    <div className="hero">
      <img src={hero} className="hero__image" />
      <div className="hero__titles">
        <h1 className="hero__title">Why the sadness, Squamish?</h1>
        <h2 className="hero__subtitle">Let's find some fun!</h2>
      </div>
    </div>
  );
}
