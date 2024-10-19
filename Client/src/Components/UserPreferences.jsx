// Client/src/Components/UserPreferences.jsx
import React from 'react';

const UserPreferences = ({ preferences, setPreferences, chartComponents }) => {
  const toggleChart = (chart) => {
    const newCharts = preferences.defaultCharts.includes(chart)
      ? preferences.defaultCharts.filter(c => c !== chart)
      : [...preferences.defaultCharts, chart];
    setPreferences({ ...preferences, defaultCharts: newCharts });
  };

  // Check if chartComponents is defined
  if (!chartComponents) {
    return <div>Loading...</div>; // Or handle the undefined case as needed
  }

  return (
    <div className="user-preferences bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Preferences</h3>
      <div className="flex flex-wrap gap-2">
        {Object.keys(chartComponents).map(chart => (
          <button
            key={chart}
            onClick={() => toggleChart(chart)}
            className={`px-3 py-1 rounded-full text-sm ${
              preferences.defaultCharts.includes(chart)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {chartComponents[chart].title}
          </button>
        ))}
      </div>
      <div className="mt-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={preferences.showAverages}
            onChange={() => setPreferences({ ...preferences, showAverages: !preferences.showAverages })}
            className="mr-2"
          />
          Show Averages
        </label>
        <label className="flex items-center mt-1">
          <input
            type="checkbox"
            checked={preferences.showTrendlines}
            onChange={() => setPreferences({ ...preferences, showTrendlines: !preferences.showTrendlines })}
            className="mr-2"
          />
          Show Trendlines
        </label>
      </div>
    </div>
  );
};

export default UserPreferences;
