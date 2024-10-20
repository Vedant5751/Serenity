// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext"; // Import the AuthProvider
import Landing from "./Pages/Landing";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ConfirmEmail from "./Pages/ConfirmEmail"; 
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import MoodTracker from "./Pages/MoodTracker";
import ResourceLibrary from "./Pages/ResourceLibrary";
import VirtualTherapySessions from "./Pages/VirtualTherapy";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Check authentication status

  return (
    <AuthProvider>
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
          <Route 
            path="/resource-library" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ResourceLibrary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/virtual-therapy" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <VirtualTherapySessions />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
