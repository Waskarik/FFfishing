import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrackerPage from "./pages/TrackerPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tracker" element={<TrackerPage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
