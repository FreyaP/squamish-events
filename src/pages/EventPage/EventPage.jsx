/* eslint-disable react/prop-types */
import { useLocation, useNavigate, useParams } from "react-router";
import "./EventPage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import FormatDate from "../../utils/FormatDate";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import location from "../../assets/images/icons/location.svg";
import price from "../../assets/images/icons/price.svg";
import details from "../../assets/images/icons/details.svg";
import save from "../../assets/images/icons/star.svg";
import remove from "../../assets/images/icons/remove.svg";
import edit from "../../assets/images/icons/edit.svg";
import person from "../../assets/images/icons/person.svg";
import deleteIcon from "../../assets/images/icons/delete.svg";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

export default function EventPage({ loggedIn }) {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [host, setHost] = useState();
  const navigate = useNavigate();
  const [alreadySaved, setAlreadySaved] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [myEvent, setMyEvent] = useState(false);

  // Get selected event information
  useEffect(() => {
    const getSelectedEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events/${id}`);

        setEvent(response.data);
        document.title = `${response.data.event_name}`;
      } catch (error) {
        console.log(error);
      }
    };
    getSelectedEvent();
  }, [id]);

  // Get host name from the event user id. Set whether event belongs to logged in user
  useEffect(() => {
    const getHostDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${event.user_id}`);
        setHost(response.data.user_name);

        if (event.user_id === Number(sessionStorage.getItem("user_id"))) {
          setMyEvent(true);
        }
      } catch (error) {
        console.log(error);
      }
      //Check if event is saved by user
      try {
        const savedEvents = await axios.get(
          `${BASE_URL}/saved/${sessionStorage.getItem("user_id")}`
        );

        const eventIsSaved = savedEvents.data.find(
          (event) => event.event_id === Number(id)
        );
        if (eventIsSaved) {
          setAlreadySaved(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHostDetails();
  }, [event, id]);

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

  const handleSave = async () => {
    // need event id and logged in user id
    const newLike = {
      event_id: id,
      user_id: sessionStorage.getItem("user_id"),
    };
    // post to likes table
    try {
      await axios.post(`${BASE_URL}/saved`, newLike);
      setAlreadySaved(true);
      alert(`saved event`);
    } catch (error) {
      console.log(error);
      //setAlreadySaved(true);
      //alert(error.response.data.message || error.message);
    }
  };

  const handleRemoveSave = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/saved/event/${id}/user/${sessionStorage.getItem(
          "user_id"
        )}`
      );
      setAlreadySaved(false);

      alert(`Removed from saved events`);
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
              {loggedIn && !myEvent && !alreadySaved && (
                <>
                  <img
                    src={save}
                    alt="save icon"
                    className="event-page__icon--action"
                    onClick={handleSave}
                  />
                  <p className="event-page__icon--tooltip">Save event</p>{" "}
                </>
              )}
              {alreadySaved && (
                <>
                  <img
                    src={remove}
                    alt="remove from saved icon"
                    className="event-page__icon--action"
                    onClick={handleRemoveSave}
                  />
                  <p className="event-page__icon--tooltip">
                    Remove from saved events
                  </p>{" "}
                </>
              )}
              {myEvent && (
                <>
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
                </>
              )}
            </div>
          </div>
          <h1 className="event-page__title">{event.event_name}</h1>
          <h2 className="event-page__label">Hosted By</h2>
          <div className="event-page__group">
            <img src={person} alt="person icon" />
            <p className="event-page__host">{host}</p>
          </div>
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
          <h2 className="event-page__label">Price</h2>
          <div className="event-page__group">
            <img src={price} alt="price icon" />
            <p className="event-page__tickets">{event.ticket_link}</p>
          </div>
        </div>
      </div>
    );
  }
}
