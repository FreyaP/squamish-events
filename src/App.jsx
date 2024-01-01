import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventPage from "./pages/EventPage/EventPage";
import EditEvent from "./pages/EditEvent/EditEvent";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
