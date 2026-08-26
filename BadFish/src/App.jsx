import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrackerPage from "./pages/TrackerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tracker" element={<TrackerPage />} />
    </Routes>
  );
}

export default App;
