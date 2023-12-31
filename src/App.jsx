import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventPage from "./pages/EventPage/EventPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/events/:id" element={<EventPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
