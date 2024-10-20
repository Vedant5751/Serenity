import React from "react";
import SidebarDemo from "../Components/Sidebar"; // Import Sidebar
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Sample data for demonstration
const moodSummary = {
  averageMood: "😊 Happy",
  moodHistory: [3, 4, 5, 3, 4, 2, 5], // Mood ratings for the last 7 days
};

const upcomingSession = {
  therapistName: "Dr. Emily White",
  sessionTime: "October 22, 2024 - 10:00 AM",
  videoLink: "https://zoom.us/j/1234567890",
};

const recentResources = [
  { id: 1, title: "Managing Anxiety", link: "/resources/managing-anxiety" },
  {
    id: 2,
    title: "Mindfulness Meditation Guide",
    link: "/resources/mindfulness-meditation",
  },
];

const wellnessTips = [
  "Take deep breaths to calm your mind.",
  "Remember, self-care is not selfish.",
  "Try a 5-minute mindfulness meditation today.",
];

const Dashboard = () => {
  const randomTip =
    wellnessTips[Math.floor(Math.random() * wellnessTips.length)];

  return (
    <div className="flex flex-row h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarDemo />
      <div className="flex-grow p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome back!</h1>

        {/* Mood Tracker Summary */}
        <div className="mb-6 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm dark:text-white">
          <h2 className="text-xl font-semibold mb-4">Mood Tracker Summary</h2>
          <p>
            Average Mood: <strong>{moodSummary.averageMood}</strong>
          </p>
          <Link to="/moodtracker" className="text-blue-500 hover:underline">
            View detailed mood history
          </Link>
        </div>

        {/* Upcoming Therapy Session */}
        {upcomingSession && (
          <div className="mb-6 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm dark:text-white">
            <h2 className="text-xl font-semibold mb-4">
              Upcoming Therapy Session
            </h2>
            <p>
              Therapist: <strong>{upcomingSession.therapistName}</strong>
            </p>
            <p>
              Time: <strong>{upcomingSession.sessionTime}</strong>
            </p>
            <a
              href={upcomingSession.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Join Session
            </a>
          </div>
        )}

        {/* Recent Resources */}
        <div className="mb-6 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm dark:text-white">
          <h2 className="text-xl font-semibold mb-4">
            Recently Accessed Resources
          </h2>
          <ul>
            {recentResources.map((resource) => (
              <li key={resource.id}>
                <Link
                  to={resource.link}
                  className="text-blue-500 hover:underline"
                >
                  {resource.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Wellness Tip */}
        <div className="mb-6 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm dark:text-white">
          <h2 className="text-xl font-semibold mb-4">Wellness Tip</h2>
          <p>{randomTip}</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/moodtracker"
            className="p-4 border rounded-lg bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition-colors"
          >
            Log New Mood
          </Link>
          <Link
            to="/virtual-therapy"
            className="p-4 border rounded-lg bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Therapy Session
          </Link>
          <Link
            to="/resource-library"
            className="p-4 border rounded-lg bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Resource Library
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
