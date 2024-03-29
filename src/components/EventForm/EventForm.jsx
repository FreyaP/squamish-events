/* eslint-disable react/prop-types */
import axios from "axios";
import "./EventForm.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EventForm({ id }) {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [formValues, setFormValues] = useState({
    event_name: "",
    venue: "",
    description: "",
    category: "",
    date: "",
    ticket_link: "",
    image: "",
    user_id: sessionStorage.getItem("user_id"),
  });
  const [originalImage, setOriginalImage] = useState();
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  //Get existing event details
  useEffect(() => {
    const getEventDetails = async () => {
      if (id === undefined) {
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/events/${id}`);

        const dateParts = response.data.date.split("T");

        setFormValues(response.data);
        setFormValues((prevState) => ({
          ...prevState,
          date: dateParts[0],
        }));
        setOriginalImage(response.data.image);
      } catch (error) {
        console.log(error);
      }
    };
    getEventDetails();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFile(formValues.image);
    if (name === "image" && e.target.files[0]) {
      setFile(e.target.files[0]);
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
    if (e.target.value) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: true,
      });
    }
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    // Validate
    for (const property in formValues) {
      if (formValues[property] === "") {
        setFormErrors((prevState) => ({ ...prevState, [property]: true }));
      }
    }

    if (Object.values(formErrors).some((error) => error)) {
      return;
    }

    try {
      //New Event
      if (id === undefined) {
        const formData = new FormData();
        formData.append("image", file);

        for (const key in formValues) {
          if (Object.prototype.hasOwnProperty.call(formValues, key)) {
            formData.append(key, formValues[key]);
          }
        }

        const response = await axios.post(`${BASE_URL}/events`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        alert("Event added!!");
        navigate(-1);
      }
      // Edit without image change
      if (originalImage === file) {
        const response = await axios.put(
          `${BASE_URL}/events/${id}`,
          formValues
        );
        console.log(response);
        alert("Event updated!!");
        navigate("/");
      }
      // Edit with image file change
      else {
        const formData = new FormData();
        formData.append("image", file);

        for (const key in formValues) {
          if (Object.prototype.hasOwnProperty.call(formValues, key)) {
            formData.set(key, formValues[key]);
          }
        }

        formData.set("image", file);

        const response = await axios.put(`${BASE_URL}/events/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        alert("Event updated!!");
        navigate(-1);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="add-event">
      <form className="add-event__form" encType="multipart/form-data">
        <div className="add-event__name">
          <label htmlFor="event_name">Your Event Name</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            className={
              formErrors.event_name
                ? "add-event__input--error"
                : "add-event__input"
            }
            value={formValues.event_name}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__venue">
          <label htmlFor="venue">Event Venue</label>
          <input
            type="text"
            id="venue"
            name="venue"
            className={
              formErrors.venue ? "add-event__input--error" : "add-event__input"
            }
            value={formValues.venue}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__description">
          <label htmlFor="description">Event Description</label>
          <input
            type="text"
            className={
              formErrors.description
                ? "add-event__input--error"
                : "add-event__input"
            }
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__category">
          <label htmlFor="category">Event Type</label>

          <select
            name="category"
            id="category"
            className={
              formErrors.category
                ? "add-event__input--error"
                : "add-event__input"
            }
            value={formValues.category}
            onChange={handleChange}
          >
            <option value="Please select" selected>
              Please select
            </option>
            <option value="Adventure">Adventure</option>
            <option value="Arts">Arts</option>
            <option value="Business">Business</option>
            <option value="Community">Community</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Health">Health</option>
            <option value="Music">Music</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div className="add-event__date">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            className={
              formErrors.date ? "add-event__input--error" : "add-event__input"
            }
            id="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            value={formValues.date}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__ticket">
          <label htmlFor="name">Price | Free</label>
          <input
            type="text"
            id="ticket_link"
            name="ticket_link"
            className={
              formErrors.ticket_link
                ? "add-event__input--error"
                : "add-event__input"
            }
            placeholder="Enter Price or Free"
            value={formValues.ticket_link}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__image">
          <label htmlFor="image">Upload an image for your event</label>
          <input
            className={
              formErrors.image
                ? "add-event__input add-event__input--file add-event__input--file-error"
                : "add-event__input add-event__input--file"
            }
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className="add-event__buttons-box">
          {error && <div className="add-event__error">{error}</div>}
          <button
            className="event__button-cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>

          <button onClick={updateEvent}>Submit</button>
        </div>
      </form>
    </div>
  );
}
