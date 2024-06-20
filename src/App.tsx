import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./homepage/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/something" element={<h2>Something</h2>} />
    </Routes>
  );
}

export default App;
