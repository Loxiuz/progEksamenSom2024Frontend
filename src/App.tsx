import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./homepage/Home";
import ParticipantForm from "./participants/ParticipantForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/participant/form" element={<ParticipantForm />} />
    </Routes>
  );
}

export default App;
