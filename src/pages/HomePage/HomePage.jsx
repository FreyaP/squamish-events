import { useEffect, useState } from "react";
import "./HomePage.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import hero from "../../assets/images/svgs/hero.svg";
import FormatDate from "../../utils/FormatDate";
import SortEventsByDate from "../../utils/SortEventsByDate";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function HomePage() {
  const [allEvents, setAllEvents] = useState();
  const [filteredEvents, setFilteredEvents] = useState();
  const [category, setCategory] = useState("All");

  // Gets host name based on the event user id and adds name to the event object in state
  const getHost = async (events) => {
    try {
      const eventsWithHost = await Promise.all(
        events.map(async (event) => {
          const response = await axios.get(
            `${BASE_URL}/users/${event.user_id}`
          );
          return { ...event, host_name: response.data.user_name };
        })
      );
      // Sort events and set state
      setFilteredEvents(SortEventsByDate(eventsWithHost));
      setAllEvents(SortEventsByDate(eventsWithHost));
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to indicate that the function failed
    }
  };

  // get all events. Call the getHost function
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events`);
        getHost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);

  // Filter events based on the category
  const handleFilter = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    if (e.target.value === "All") {
      setFilteredEvents(allEvents);
      return;
    }
    const filteredEvents = allEvents.filter(
      (item) => item.category === e.target.value
    );

    setFilteredEvents(filteredEvents);
  };

  if (!allEvents || allEvents.length === 0) {
    return <h1>Finding events in Squamish...</h1>;
  } else if (allEvents.length > 0) {
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
          <div className="divider"></div>
          {filteredEvents.length === 0 ? (
            <h2 className="events--title">
              Bad times! No {category} events in Squamish!
            </h2>
          ) : (
            <>
              <h2 className="events--title">{category} events in Squamish</h2>
              <section className="events__list">
                {filteredEvents.map((event) => {
                  // get date for yesterday to conditionally display event based on whether it has passed
                  const yday = new Date();
                  yday.setDate(new Date().getDate() - 1);

                  return (
                    <Link
                      to={`/events/${event.id}`}
                      className={
                        yday < new Date(event.date) ? "event" : "event--hidden"
                      }
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

                        <h3 className="event__host">{event.host_name}</h3>

                        <p className="event__date">{FormatDate(event.date)}</p>
                      </div>
                    </Link>
                  );
                })}
              </section>
            </>
          )}
        </div>
      </div>
    );
  }
}
