import React, { useState } from "react";
import SidebarDemo from "../Components/Sidebar"; // Import Sidebar
import { motion } from "framer-motion";

// Sample therapist data
const therapists = [
  {
    id: 1,
    name: "Dr. Emily White",
    specialization: "Anxiety & Depression",
    availableSlots: ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"],
    profilePic: "https://via.placeholder.com/100",
    videoLink: "https://zoom.us/j/1234567890", // Example video session link
  },
  {
    id: 2,
    name: "Dr. Michael Green",
    specialization: "Cognitive Behavioral Therapy",
    availableSlots: ["9:00 AM - 10:00 AM", "3:00 PM - 4:00 PM"],
    profilePic: "https://via.placeholder.com/100",
    videoLink: "https://zoom.us/j/0987654321",
  },
];

const VirtualTherapySessions = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTherapistSelect = (therapist) => {
    setSelectedTherapist(therapist);
    setSelectedSlot(""); // Reset the slot when a new therapist is selected
    setShowConfirmation(false); // Reset confirmation view
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookSession = () => {
    if (selectedSlot && selectedTherapist) {
      setShowConfirmation(true);
    }
  };

  return (
    <div className="flex flex-row h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarDemo />
      <div className="flex-grow p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Virtual Therapy Sessions</h1>

        {/* Therapist List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {therapists.map((therapist) => (
            <motion.div
              key={therapist.id}
              className="therapist-card border rounded-lg p-4 shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 dark:text-white"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleTherapistSelect(therapist)}
            >
              <img
                src={therapist.profilePic}
                alt={`${therapist.name} profile`}
                className="rounded-full h-20 w-20 mb-4"
              />
              <h2 className="font-semibold text-lg">{therapist.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {therapist.specialization}
              </p>
              <p className="text-gray-500 dark:text-gray-300 mt-2">
                {therapist.availableSlots.length} available slots
              </p>
            </motion.div>
          ))}
        </div>

        {/* Show available slots for selected therapist */}
        {selectedTherapist && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Available Slots for {selectedTherapist.name}
            </h2>
            <div className="flex flex-wrap gap-4">
              {selectedTherapist.availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotSelect(slot)}
                  className={`py-2 px-4 rounded-lg ${
                    selectedSlot === slot
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  } hover:bg-blue-400 transition-colors`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button
              onClick={handleBookSession}
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Session
            </button>
          </div>
        )}

        {/* Confirmation message */}
        {showConfirmation && selectedTherapist && (
          <div className="mt-8 p-6 border rounded-lg bg-green-100 dark:bg-green-800 dark:text-white">
            <h3 className="text-xl font-semibold mb-4">Session Confirmed!</h3>
            <p>
              You have booked a session with{" "}
              <strong>{selectedTherapist.name}</strong> on{" "}
              <strong>{selectedSlot}</strong>.
            </p>
            <p>
              Please use the following link to join your virtual session:
              <a
                href={selectedTherapist.videoLink}
                className="block text-blue-500 hover:underline mt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Session
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTherapySessions;
