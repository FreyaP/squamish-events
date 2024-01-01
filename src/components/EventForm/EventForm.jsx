/* eslint-disable react/prop-types */
import axios from "axios";
import "./EventForm.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
    user_id: 1,
  });
  const [originalImage, setOriginalImage] = useState();

  //Get existing event details
  useEffect(() => {
    const getEventDetails = async () => {
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
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    console.log(`submitted`);
    if (originalImage === file) {
      const response = await axios.put(`${BASE_URL}/events/${id}`, formValues);
      console.log(response);
      alert("Event updated!!");
      navigate("/");
    } else {
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
      navigate("/");
    }
  };
  //   console.log(formValues);
  //   console.log("FVIMage", formValues.image);
  //   console.log("file", file);
  //   console.log("original", originalImage);
  return (
    <div className="add-event">
      <h1 className="add-event__title"></h1>
      <form className="add-event__form" encType="multipart/form-data">
        <div className="add-event__name">
          <label htmlFor="event_name">Your Event Name</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            className="add-event__input"
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
            className="add-event__input"
            value={formValues.venue}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__description">
          <label htmlFor="description">Event Description</label>
          <input
            type="text"
            className="add-event__input"
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__category">
          <label htmlFor="category">Event Type</label>
          <input
            type="text"
            id="category"
            name="category"
            className="add-event__input"
            value={formValues.category}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__date">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            className="add-event__input"
            id="date"
            name="date"
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
            className="add-event__input"
            placeholder="Is it FREE?"
            value={formValues.ticket_link}
            onChange={handleChange}
          />
        </div>
        <div className="add-event__image">
          <label htmlFor="image">Upload an image for your event</label>
          <input
            className="add-event__input add-event__input--file"
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>

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
      </form>
    </div>
  );
}
