import { Routes, Route } from "react-router-dom";
import "./App.css";
import Feedbacks from "./pages/Feedbacks";
import LeaseAgreement from "./pages/LeaseAgreement";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Analytics from "./pages/Analitics";

function App() {
  return (
    <Routes>
      <Route path="/feedback" element={<Feedbacks />} />
      <Route path="/leaseagreemnt" element={<LeaseAgreement />} />
      <Route path="/statistics/:title" element={<Statistics />} />
      <Route path="/analitics" element={<Analytics />} />
      <Route path="/leaseagreemnt/:id" element={<LeaseAgreement />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
