import axios from "axios";
import "./AddEvent.scss";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddEvent() {
  const [file, setFile] = useState();
  //const [imageName, setImageName] = useState();
  const [formValues, setFormValues] = useState({
    event_name: "",
    venue: "",
    description: "",
    category: "",
    date: "",
    ticket_link: "",
    user_id: 1,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "image") {
      setFile(e.target.files[0]);
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    console.log(`submitted`);
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
    //setImageName(response.data.imageName);
  };
  console.log(file);
  console.log(formValues);
  return (
    <div className="add-event">
      <h1 className="add-event__title">
        post an event and share with the world
      </h1>
      <form className="add-event__form" encType="multipart/form-data">
        <div className="add-event__name">
          <label htmlFor="event_name">Your Event Name</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            className="add-event__input"
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
            onChange={handleChange}
          />
        </div>
        <div className="add-event__ticket">
          <label htmlFor="name">Ticket URL</label>
          <input
            type="text"
            id="ticket_link"
            name="ticket_link"
            className="add-event__input"
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
        <button onClick={uploadImage}>Submit</button>
      </form>
    </div>
  );
}
