import "./Dashboard.scss";
import Hero from "../../components/Hero/Hero";
import account from "../../assets/images/svgs/account.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormatDate from "../../utils/FormatDate";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Dashboard() {
  const { user_id } = useParams();
  //const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events/user/${user_id}`);
        setMyEvents(response.data);

        const userResponse = await axios.get(`${BASE_URL}/users/${user_id}`);
        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserEvents();
  }, [user_id]);

  if (user_id !== sessionStorage.getItem("user_id")) {
    return (
      <div className="dashboard">
        <Hero
          image={account}
          title={`Uh oh! `}
          subtitle={`Please log in to view this page`}
          link={"./login"}
          link_name={`Login here!`}
        />
      </div>
    );
  }
  if (user_id === sessionStorage.getItem("user_id")) {
    return (
      <div className="dashboard">
        <Hero
          image={account}
          title={`Hi ${user?.user_name.split(" ")[0]}!`}
          subtitle={"Let's create some fun and share some awesome times!"}
        />
        <div className="dashboard-container">
          <div className="dashboard__add-event">
            <Link to="/addevent" className="dashboard__add-event-link">
              <button className="dashboard__post">Post an event</button>
            </Link>
          </div>
          <div className="dashboard__my-events">
            <h2>My Events:</h2>
            <div className="dashboard__events-list">
              {myEvents?.map((event) => {
                return (
                  <Link
                    to={`/events/${event.id}`}
                    className="event"
                    key={event.id}
                  >
                    <img
                      src={`${BASE_URL}/images/${event.image}`}
                      alt=""
                      className={
                        !event.image
                          ? "event__image--placeholder"
                          : "event__image"
                      }
                    />
                    <div className="event__details">
                      <h2 className="event__title">{event.event_name}</h2>

                      <p className="event__date">{FormatDate(event.date)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="dashboard__saved-events">
            <h2>Saved Events:</h2>
          </div>
        </div>
      </div>
    );
  }
}
