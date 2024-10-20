import React, { useState, useEffect } from "react";
import { Line, Pie, Bar, Radar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import SidebarDemo from "../Components/Sidebar";
import UserPreferences from "../Components/UserPreferences";
import { db } from "../firebase"; 
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'; // Import CognitoUser and CognitoUserPool

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

ChartJS.register(...registerables);

const MoodTracker = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState("");
  const [dateRange, setDateRange] = useState("week");
  const [selectedTag, setSelectedTag] = useState("");
  const [userId, setUserId] = useState(null); // Initialize userId as null

  const [moodAverages, setMoodAverages] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
  });
  const [customTags, setCustomTags] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    showTrendlines: false,
    showAverages: false,
    defaultCharts: ["line", "pie"], // Example default charts
  });

  // Mood entry buttons
  const moodOptions = [
    { value: 1, label: "Very Sad", emoji: "😢" },
    { value: 2, label: "Sad", emoji: "🙁" },
    { value: 3, label: "Neutral", emoji: "😐" },
    { value: 4, label: "Happy", emoji: "🙂" },
    { value: 5, label: "Very Happy", emoji: "😄" },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  // Filter functions
  const filterMoodData = () => {
    let filteredData = moodData;
    if (dateRange === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filteredData = filteredData.filter((entry) => entry.date >= oneWeekAgo);
    } else if (dateRange === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filteredData = filteredData.filter((entry) => entry.date >= oneMonthAgo);
    }
    if (selectedTag) {
      filteredData = filteredData.filter((entry) =>
        entry.tags.includes(selectedTag)
      );
    }
    return filteredData;
  };

  // Chart data preparation functions
  const prepareLineChartData = () => {
    const filteredData = filterMoodData();
    const data = {
      labels: filteredData.map((entry) => entry.date.toLocaleDateString()), // Ensure date is a Date object
      datasets: [
        {
          label: "Mood",
          data: filteredData.map((entry) => entry.mood.value),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    if (userPreferences.showTrendlines) {
      const trendlineData = calculateTrendline(filteredData);
      data.datasets.push({
        label: "Trendline",
        data: trendlineData,
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderDash: [5, 5],
        fill: false,
      });
    }

    if (userPreferences.showAverages) {
      data.datasets.push({
        label: "Weekly Average",
        data: new Array(filteredData.length).fill(moodAverages.weekly),
        borderColor: "rgba(54, 162, 235, 0.5)",
        borderDash: [10, 5],
        fill: false,
      });
    }

    return data;
  };

  const calculateTrendline = (data) => {
    // Simple linear regression
    const xSum = data.reduce((sum, _, i) => sum + i, 0);
    const ySum = data.reduce((sum, d) => sum + d.mood.value, 0);
    const xySum = data.reduce((sum, d, i) => sum + i * d.mood.value, 0);
    const xSquaredSum = data.reduce((sum, _, i) => sum + i * i, 0);
    const n = data.length;

    const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;

    return data.map((_, i) => slope * i + intercept);
  };

  const preparePieChartData = () => {
    const filteredData = filterMoodData();
    const moodCounts = moodOptions.reduce((acc, mood) => {
      acc[mood.label] = filteredData.filter(
        (entry) => entry.mood.value === mood.value
      ).length;
      return acc;
    }, {});

    return {
      labels: Object.keys(moodCounts),
      datasets: [
        {
          data: Object.values(moodCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    };
  };

  const prepareRadarChartData = () => {
    const filteredData = filterMoodData();
    const moodAverages = moodOptions.reduce((acc, mood) => {
      const moodEntries = filteredData.filter(
        (entry) => entry.mood.value === mood.value
      );
      acc[mood.label] =
        moodEntries.length > 0
          ? moodEntries.reduce((sum, entry) => sum + entry.mood.value, 0) /
            moodEntries.length
          : 0;
      return acc;
    }, {});

    return {
      labels: Object.keys(moodAverages),
      datasets: [
        {
          label: "Mood Intensity",
          data: Object.values(moodAverages),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    };
  };

  const prepareBarChartData = () => {
    const filteredData = filterMoodData();
    const moodCounts = {};

    filteredData.forEach((entry) => {
      const date = entry.date.toLocaleDateString();
      if (!moodCounts[date]) {
        moodCounts[date] = { count: 0, totalValue: 0 };
      }
      moodCounts[date].count += 1;
      moodCounts[date].totalValue += entry.mood.value;
    });

    const labels = Object.keys(moodCounts);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Average Mood",
          data: labels.map((date) => moodCounts[date].totalValue / moodCounts[date].count),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };

    return data;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const chartComponents = {
    line: {
      component: Line,
      data: prepareLineChartData,
      title: "Mood Timeline",
    },
    pie: {
      component: Pie,
      data: preparePieChartData,
      title: "Mood Distribution",
    },
    bar: {
      component: Bar, // Add Bar chart component
      data: prepareBarChartData, // Use the new data preparation function
      title: "Mood Bar Chart",
    },
    heatmap: {
      component: CalendarHeatmap,
      data: null,
      title: "Mood Heatmap",
      props: {
        values: moodData.map((entry) => ({
          date: entry.date,
          count: entry.mood.value,
        })),
        classForValue: (value) => {
          if (!value) return "color-empty";
          return `color-scale-${value.count}`; // Fixed string interpolation
        },
      },
    },
    radar: {
      component: Radar,
      data: prepareRadarChartData,
      title: "Mood Dimensions",
    },
  };

  
  useEffect(() => {
    const fetchMoodData = async () => {
      if (userId) {
        const q = query(collection(db, "moods"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const fetchedMoodData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.data().date.toDate(), // Convert Firestore Timestamp to Date
          mood: doc.data().mood,
          note: doc.data().note,
          tags: doc.data().tags,
          userId: doc.data().userId,
        }));
        setMoodData(fetchedMoodData); // Set the fetched mood data
        calculateAverages(fetchedMoodData); // Calculate averages with the fetched data
      }
    };

    fetchMoodData(); // Fetch mood data when userId changes
  }, [userId]); // Dependency on userId
  
  useEffect(() => {
    const fetchUserId = () => {
      const cognitoUser = userPool.getCurrentUser(); // Get the current user
      if (cognitoUser) {
        setUserId(cognitoUser.getUsername()); // Set the userId to the username
      } else {
        console.error("No user is currently logged in.");
      }
    };

    fetchUserId(); // Call the function to fetch user ID
  }, []); // Empty dependency array to run once on mount

  const handleMoodSubmit = async () => {
    if (selectedMood) {
      const tags = moodNote.match(/#\w+/g) || [];
      const newCustomTags = tags.filter((tag) => !customTags.includes(tag));
      
      const newMoodEntry = {
        date: new Date(),
        mood: selectedMood,
        note: moodNote,
        tags: tags,
        userId: userId,
      };
      
      await addDoc(collection(db, "moods"), newMoodEntry);
      setMoodData([...moodData, newMoodEntry]);
      setCustomTags([...customTags, ...newCustomTags]);
      setSelectedMood(null);
      setMoodNote("");
    }
  };
  const calculateAverages = (data) => {
    if (data.length === 0) return;

    const dailyMood = {};
    const weeklyMood = {};
    const monthlyMood = {};

    data.forEach(entry => {
      const date = entry.date.toLocaleDateString();
      const week = new Date(entry.date).toISOString().slice(0, 10).split('-').slice(0, 2).join('-'); // YYYY-MM
      const month = new Date(entry.date).toISOString().slice(0, 7); // YYYY-MM

      // Daily average
      if (!dailyMood[date]) {
        dailyMood[date] = { total: 0, count: 0 };
      }
      dailyMood[date].total += entry.mood.value;
      dailyMood[date].count += 1;

      // Weekly average
      if (!weeklyMood[week]) {
        weeklyMood[week] = { total: 0, count: 0 };
      }
      weeklyMood[week].total += entry.mood.value;
      weeklyMood[week].count += 1;

      // Monthly average
      if (!monthlyMood[month]) {
        monthlyMood[month] = { total: 0, count: 0 };
      }
      monthlyMood[month].total += entry.mood.value;
      monthlyMood[month].count += 1;
    });

    const dailyAverage = Object.values(dailyMood).reduce((acc, curr) => acc + (curr.total / curr.count), 0) / Object.keys(dailyMood).length;
    const weeklyAverage = Object.values(weeklyMood).reduce((acc, curr) => acc + (curr.total / curr.count), 0) / Object.keys(weeklyMood).length;
    const monthlyAverage = Object.values(monthlyMood).reduce((acc, curr) => acc + (curr.total / curr.count), 0) / Object.keys(monthlyMood).length;

    setMoodAverages({
      daily: dailyAverage,
      weekly: weeklyAverage,
      monthly: monthlyAverage,
    });
  };

  return (
    <div className="flex flex-row h-screen bg-gray-100 dark:bg-gray-900">
      <SidebarDemo />
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="mood-tracker">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Mood Tracker
          </h1>
          {/* Mood Entry Buttons */}
          <div className="mood-entry mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              How are you feeling today?
            </h2>
            <div className="mood-buttons flex space-x-4 mb-4">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood)}
                  className={`p-3 rounded-full text-2xl transition-colors duration-200 ${
                    selectedMood === mood
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                  >
                  {mood.emoji}
                </button>
              ))}
            </div>
            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="Add notes or #tags about your mood..."
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleMoodSubmit}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Log Mood
            </button>
          </div>

          {/* Filters */}
          <div className="filters mb-8 flex space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="all">All Time</option>
            </select>
            <input
              type="text"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              placeholder="Filter by tag (e.g., #work)"
              className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <UserPreferences
            preferences={userPreferences}
            setPreferences={setUserPreferences}
            chartComponents={chartComponents} // Ensure this is defined and passed
          />
          {/* Charts */}
          <div className="charts grid grid-cols-2 gap-8 mt-8">
            {userPreferences.defaultCharts.map((chartType, index) => (
              <div
                key={`${chartType}-${index}`}
                className="chart bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md relative"
                style={{ height: "400px", width: "100%" }}
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
                  {chartComponents[chartType].title}
                </h2>
                <div style={{ height: "calc(100% - 40px)" }}>
                  {chartType === "heatmap" ? (
                    <CalendarHeatmap
                      {...chartComponents.heatmap.props}
                      startDate={
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() - 1)
                        )
                      }
                      endDate={new Date()}
                      onClick={(value) => {
                        if (value) {
                          alert(
                            `Mood on ${value.date.toDateString()}: ${
                              value.count
                            }`
                          );
                        }
                      }}
                    />
                  ) : (
                    React.createElement(chartComponents[chartType].component, {
                      data: chartComponents[chartType].data(),
                      options: chartOptions,
                    })
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Mood Diary */}
          <div className="mood-diary mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Mood Diary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterMoodData().map((entry, index) => (
                <div
                  key={index}
                  className="diary-entry p-4 border rounded-md bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      {entry.date.toLocaleDateString()}
                    </span>
                    <span className="text-2xl">{entry.mood.emoji}</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">
                    {entry.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mood Emoji Graph */}
          <div className="emoji-graph mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Mood Emoji Timeline
            </h2>
            <div className="flex flex-wrap">
              {filterMoodData().map((entry, index) => (
                <span
                  key={index}
                  title={entry.date.toLocaleDateString()}
                  className="text-2xl mr-2 mb-2"
                >
                  {entry.mood.emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
