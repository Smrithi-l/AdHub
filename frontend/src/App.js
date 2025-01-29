import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard"; // Import the Dashboard component
import Login from "./Components/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add dashboard route */}
        <Route path="/login" element={<Login />} />
        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
