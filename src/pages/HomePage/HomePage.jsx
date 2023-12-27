import "./HomePage.scss";

export default function HomePage() {
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
      </div>
    </div>
  );
}
