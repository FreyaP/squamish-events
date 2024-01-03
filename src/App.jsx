import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventPage from "./pages/EventPage/EventPage";
import EditEvent from "./pages/EditEvent/EditEvent";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUp from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/editevent/:id" element={<EditEvent />} />
          <Route path="/delete" element={<DeleteModal />} />
          <Route path="/myaccount/:user_id" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
