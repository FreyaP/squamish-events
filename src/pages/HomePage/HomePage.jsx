import { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import hero from "../../assets/images/svgs/hero.svg";
import FormatDate from "../../utils/FormatDate";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function HomePage() {
  const [events, setEvents] = useState();
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

  if (!events || events.length === 0) {
    return <h1>Finding events in Squamish...</h1>;
  } else if (events.length > 0) {
    return (
      <div className="homepage">
        <Hero
          image={hero}
          title="Why the sadness, Squamish?"
          subtitle="Let's find some fun!"
        />
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
                      <h3 className="event__host">{event.user_id}</h3>

                      <p className="event__date">{FormatDate(event.date)}</p>
                    </div>
                  </Link>
                );
              })}
            </section>
          )}
        </div>
      </div>
    );
  }
}
