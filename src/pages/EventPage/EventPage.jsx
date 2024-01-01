import { useNavigate, useParams } from "react-router";
import "./EventPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import FormatDate from "../../utils/FormatDate";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import location from "../../assets/images/icons/location.svg";
import price from "../../assets/images/icons/price.svg";
import details from "../../assets/images/icons/details.svg";
import save from "../../assets/images/icons/star.svg";
import edit from "../../assets/images/icons/edit.svg";
import deleteIcon from "../../assets/images/icons/delete.svg";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  //document.title = `Squamish Events | ${}`;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const getSelectedEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events/${id}`);

        setEvent(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSelectedEvent();
  }, [id]);

  const deleteEvent = async () => {
    try {
      setShowDeleteModal(false);
      await axios.delete(`${BASE_URL}/events/${id}`);
      alert(`${event.event_name} has been deleted`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!event) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="event-page">
        <div className="event-page__header">
          <img
            src={`${BASE_URL}/images/${event.image}`}
            alt="event image"
            className="event-page__image"
          />
        </div>
        <div className="event-page__details">
          <div className="event-page__details--top">
            <p className="event-page__date">
              {event ? FormatDate(event.date) : null}
            </p>
            <div className="event-page__icons">
              <img
                src={save}
                alt="save icon"
                className="event-page__icon--action"
              />
              <p className="event-page__icon--tooltip">Save event</p>
              <Link to={`/editevent/${id}`}>
                <img
                  src={edit}
                  alt="save icon"
                  className="event-page__icon--action"
                />
                <p className="event-page__icon--tooltip">Edit event</p>
              </Link>

              <img
                src={deleteIcon}
                alt="delete icon"
                className="event-page__icon--action"
                onClick={() => setShowDeleteModal(true)}
              />
              <p className="event-page__icon--tooltip">Delete event</p>
              <DeleteModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                event={event.event_name}
                deleteEvent={deleteEvent}
              />
            </div>
          </div>
          <h1 className="event-page__title">{event.event_name}</h1>
          <h2 className="event-page__label">Hosted By</h2>
          <p className="event-page__host">{event.user_id}</p>
          <h2 className="event-page__label">Location</h2>
          <div className="event-page__group">
            <img src={location} alt="location icon" />

            <p className="event-page__location">{event.venue}</p>
          </div>
          <h2 className="event-page__label">About this event</h2>
          <div className="event-page__group">
            <img src={details} alt="details icon" />
            <p className="event-page__description">{event.description}</p>
          </div>
          <h2 className="event-page__label">Ticket Details</h2>
          <div className="event-page__group">
            <img src={price} alt="price icon" />
            <p className="event-page__tickets">{event.ticket_link}</p>
          </div>
        </div>
      </div>
    );
  }
}
