import "./App.css";
import TravleTest from "./pages/TravelTest";
import TravelResult from "./pages/TravelResult";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TravleTest />} />
        <Route path="/Result" element={<TravelResult />} />
      </Routes>
    </div>
  );
}

export default App;
