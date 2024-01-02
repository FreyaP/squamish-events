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
  const [filteredEvents, setFilteredEvents] = useState();
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);

        // Sort events by date
        const sortedEvents = response.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });

        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();

    if (e.target.value === "All") {
      setFilteredEvents(events);
      return;
    }
    const filteredEvents = events.filter(
      (item) => item.category === e.target.value
    );

    setFilteredEvents(filteredEvents);
  };

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
            <div className="events__filter">
              <button
                value="All"
                className="events__filter-label"
                onClick={handleFilter}
              >
                All Events
              </button>
              <button
                value="Adventure"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Adventure
              </button>
              <button
                value="Arts"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Arts
              </button>
              <button
                value="Business"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Business
              </button>
              <button
                value="Community"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Community
              </button>
              <button
                value="Food & Drink"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Food & Drink
              </button>
              <button
                value="Health"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Health
              </button>
              <button
                value="Music"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Music
              </button>
              <button
                value="Miscellaneous"
                className="events__filter-label"
                onClick={handleFilter}
              >
                Miscellaneous
              </button>
            </div>
          </section>
          {filteredEvents.length === 0 ? (
            <h2 className="events--none">Bad times! No events in Squamish!</h2>
          ) : (
            <section className="events__list">
              {filteredEvents.map((event) => {
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
