import EventForm from "../../components/EventForm/EventForm";
import Hero from "../../components/Hero/Hero";
import editEvent from "../../assets/images/svgs/edit_event.svg";
import "./EditEvent.scss";
import { useParams } from "react-router";

export default function EditEvent() {
  const { id } = useParams();

  return (
    <div>
      <Hero image={editEvent} title="Make changes to your event" />
      <EventForm id={id} />
    </div>
  );
}
