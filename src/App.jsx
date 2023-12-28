import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import AddEvent from "./pages/AddEvent/AddEvent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addevent" element={<AddEvent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
