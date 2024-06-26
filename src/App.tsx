import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./homepage/Home";
import ParticipantForm from "./participants/ParticipantForm";
import ResultList from "./results/ResultList";
import ResultForm from "./results/ResultForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/participants/form" element={<ParticipantForm />} />
      <Route path="/results" element={<ResultList />} />
      <Route path="/results/form" element={<ResultForm />} />
    </Routes>
  );
}

export default App;
