import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h2>Default Page</h2>} />
      <Route path="/something" element={<h2>Something</h2>} />
    </Routes>
  );
}

export default App;
