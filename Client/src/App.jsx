// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ConfirmEmail from "./Pages/ConfirmEmail"; 
import Dashboard from "./Pages/Dashboard";
import MoodTracker from "./Pages/MoodTracker";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Check authentication status

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} /> 
        <Route path="/signin" element={<SignIn />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/moodtracker" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MoodTracker />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
