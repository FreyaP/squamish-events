import { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function HomePage() {
  const [events, setEvents] = useState({});
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);
        console.log(response.data);

        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);

  if (events.length <= 2) {
    return <h1>Loading...</h1>;
  } else if (events.length > 2) {
    return (
      <div className="homepage">
        <div className="events">
          <section className="events__filters">
            <h2 className="events__search">Find your next event</h2>
            <form>
              <input type="text" placeholder="Search for an event" />
              <button className="events__search-button">Search</button>
            </form>
          </section>
          {!events ? (
            <p>Finding events</p>
          ) : (
            <section className="events__list">
              {events.map((event) => {
                return (
                  <div className="event" key={event.id}>
                    <h2 className="event__title">{event.event_name}</h2>
                    <h3 className="event__host">{event.user_id}</h3>
                    <img
                      src={`${BASE_URL}/images/${event.image}`}
                      alt=""
                      className="event__image--placeholder"
                    />
                    <p className="event__date">{event.date}</p>
                  </div>
                );
              })}
            </section>
          )}
        </div>
      </div>
    );
  }
}
