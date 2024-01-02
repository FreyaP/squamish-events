import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventPage from "./pages/EventPage/EventPage";
import EditEvent from "./pages/EditEvent/EditEvent";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/editevent/:id" element={<EditEvent />} />
          <Route path="/delete" element={<DeleteModal />} />
          <Route path="/myaccount/:id" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
