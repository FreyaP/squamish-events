import "./Dashboard.scss";
import Hero from "../../components/Hero/Hero";
import account from "../../assets/images/svgs/account.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormatDate from "../../utils/FormatDate";
import SortEventsByDate from "../../utils/SortEventsByDate";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Dashboard() {
  document.title = `Squamish Events | My Account`;
  const { user_id } = useParams();
  const [myEvents, setMyEvents] = useState();
  const [user, setUser] = useState();
  const [savedEvents, setSavedEvents] = useState();

  // Get event info for events that were saved by user
  const getSavedEvents = async (savedEvents) => {
    try {
      const savedEventDetails = await Promise.all(
        savedEvents.map(async (event) => {
          //get each event based on id and return
          const response = await axios.get(
            `${BASE_URL}/events/${event.event_id}`
          );
          return response.data;
        })
      );

      setSavedEvents(savedEventDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserEvents = async () => {
      //Invdividual try catch statements in case user has no events we still want to move to the next call
      //Get user name
      try {
        const userResponse = await axios.get(`${BASE_URL}/users/${user_id}`);
        setUser(userResponse.data);
      } catch (error) {
        console.log(error);
      }
      //Get events hosted by user, sort by date and set MyEvent state
      try {
        const response = await axios.get(`${BASE_URL}/events/user/${user_id}`);
        setMyEvents(SortEventsByDate(response.data));
      } catch (error) {
        console.log(error);
      }
      //Get records of events saved by user from 'saved' table - returns event ids
      try {
        const savedEvents = await axios.get(`${BASE_URL}/saved/${user_id}`);
        setSavedEvents(savedEvents.data);
        const sortedEvents = SortEventsByDate(savedEvents.data);
        // gets all event info
        getSavedEvents(sortedEvents);
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
          link={"../../login"}
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
            <div className="dashboard__events-list">
              {savedEvents?.map((event) => {
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
        </div>
      </div>
    );
  }
}
