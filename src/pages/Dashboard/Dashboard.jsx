import "./Dashboard.scss";
import Hero from "../../components/Hero/Hero";
import account from "../../assets/images/svgs/account.svg";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Hero
        image={account}
        title={"Your events"}
        subtitle={"Create some fun, share some awesome times!"}
      />
      <div className="dashboard-container">
        <div className="dashboard__add-event">
          <Link to="/addevent" className="dashboard__add-event-link">
            <button className="dashboard__post">Post an event</button>
          </Link>
        </div>
        <div className="dashboard__my-events">
          <h2>My Events:</h2>
        </div>
        <div className="dashboard__saved-events">
          <h2>Saved Events:</h2>
        </div>
      </div>
    </div>
  );
}
