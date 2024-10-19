import React, { useState } from "react";
import SidebarDemo from "../Components/Sidebar"; // Import the Sidebar component
import { IconBookmark, IconBookmarkOff, IconSearch } from "@tabler/icons-react"; // Import Bookmark and Search icons
import { motion } from "framer-motion"; // For animations

// Sample data for resources
const resources = [
  {
    id: 1,
    title: "Managing Anxiety",
    category: "Mental Health Tips",
    type: "Article",
    link: "/resources/managing-anxiety",
  },
  {
    id: 2,
    title: "Stress Relief Techniques",
    category: "Stress Relief Techniques",
    type: "Video",
    link: "/resources/stress-relief-techniques",
  },
  {
    id: 3,
    title: "Mindfulness Meditation Guide",
    category: "Mindfulness & Meditation",
    type: "Article",
    link: "/resources/mindfulness-meditation",
  },
  {
    id: 4,
    title: "Self-Care Practices",
    category: "Self-Care Practices",
    type: "Podcast",
    link: "/resources/self-care-practices",
  },
  {
    id: 5,
    title: "Crisis Support Contacts",
    category: "Crisis Support",
    type: "Infographic",
    link: "/resources/crisis-support",
  },
];

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedResources, setBookmarkedResources] = useState([]);

  const handleBookmark = (id) => {
    if (bookmarkedResources.includes(id)) {
      setBookmarkedResources(
        bookmarkedResources.filter((resourceId) => resourceId !== id)
      );
    } else {
      setBookmarkedResources([...bookmarkedResources, id]);
    }
  };

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-row h-screen bg-gray-100 dark:bg-gray-900 ">
      <SidebarDemo />
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="resource-library">
          <h1 className="text-3xl font-bold mb-6">Resource Library</h1>

          {/* Search bar with an icon */}
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch className="h-5 w-5 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border pl-10 pr-4 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                className="resource-card border rounded-lg p-4 shadow-md dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 dark:text-white"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="font-semibold text-lg">{resource.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {resource.category}
                </p>
                <p className="text-gray-500 dark:text-gray-300">
                  {resource.type}
                </p>

                <a
                  href={resource.link}
                  className="text-blue-500 dark:text-blue-400 hover:underline mt-2 block"
                >
                  Access Resource
                </a>

                {/* Bookmark button */}
                <button
                  onClick={() => handleBookmark(resource.id)}
                  aria-label={
                    bookmarkedResources.includes(resource.id)
                      ? "Remove Bookmark"
                      : "Add Bookmark"
                  }
                  className={`mt-2 text-sm inline-flex items-center gap-1 ${
                    bookmarkedResources.includes(resource.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  } hover:text-red-500 transition-colors`}
                >
                  {bookmarkedResources.includes(resource.id) ? (
                    <IconBookmarkOff className="inline-block" />
                  ) : (
                    <IconBookmark className="inline-block" />
                  )}
                  {bookmarkedResources.includes(resource.id)
                    ? "Unbookmark"
                    : "Bookmark"}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Show no results if the search doesn't match anything */}
          {filteredResources.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No resources found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
