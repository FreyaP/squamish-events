import "./AddEvent.scss";
import Hero from "../../components/Hero/Hero";
import addEvent from "../../assets/images/svgs/add_event.svg";
import EventForm from "../../components/EventForm/EventForm";

export default function AddEvent() {
  return (
    <div className="add-event">
      <Hero image={addEvent} title="post an event and share with the world" />
      <EventForm id={undefined} />
    </div>
  );
}
