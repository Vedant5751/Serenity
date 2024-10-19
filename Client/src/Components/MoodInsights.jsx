// Client/src/Components/MoodInsights.jsx
import React from 'react';

const MoodInsights = ({
  moodAverages = { daily: 0, weekly: 0, monthly: 0 }, // Ensure moodAverages is initialized properly
}) => {
  const getRecommendation = () => {
    if (moodAverages.weekly < 3) { // Use moodAverages instead of averages
      return "Your mood has been low lately. Consider talking to a friend or professional, or try some relaxation techniques.";
    } else if (moodAverages.weekly > 4) { // Use moodAverages instead of averages
      return "Great job maintaining a positive mood! Keep up your current routines and activities.";
    } else {
      return "Your mood has been steady. Try incorporating more activities you enjoy to boost your mood further.";
    }
  };

  return (
    <div className="mood-insights bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4">Mood Insights</h3>
      <p>Daily Average: {moodAverages.daily.toFixed(2)}</p>
      <p>Weekly Average: {moodAverages.weekly.toFixed(2)}</p>
      <p>Monthly Average: {moodAverages.monthly.toFixed(2)}</p>
      <div className="mt-4">
        <h4 className="font-semibold">Recommendation:</h4>
        <p>{getRecommendation()}</p>
      </div>
    </div>
  );
};

export default MoodInsights;
