import React, { useState, useEffect } from "react";

export default function Navbar() {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu Toggled");
  };

  const scrollTo = (elementId, event) => {
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // On component mount, check if dark mode was previously enabled
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <nav
          className="rounded-full border border-border/50 bg-background shadow-md transition-all duration-300 ease-in-out"
          aria-label="Main navigation"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="h4 ml-2 font-bold text-2xl">
                  <a
                    href="#"
                    onClick={(e) => scrollTo("home", e)}
                  >
                    Serenity
                  </a>
                  
                </div>
                <nav className="ml-10 hidden md:block" aria-label="Main menu">
                  <nav
                    aria-label="Main"
                    data-orientation="horizontal"
                    dir="ltr"
                    className="relative z-10 flex max-w-max flex-1 items-center justify-center"
                  >
                    <div className="position-relative">
                      <ul
                        data-orientation="horizontal"
                        className="group flex flex-1 list-none items-center justify-center space-x-1"
                        dir="ltr"
                      >
                        <a
                          href="#"
                          onClick={(e) => scrollTo("about", e)}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary-300/10 hover:bg-gray-300/20 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground focus:outline-none"
                        >
                          About Us
                        </a>
                        <a
                          className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary-300/10 hover:bg-gray-300/20 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground focus:outline-none"
                          target="_blank"
                          href="https://github.com/Vedant5751/Serenity"
                        >
                          GitHub
                        </a>
                        <a
                          href="#"
                          onClick={(e) => scrollTo("footer", e)}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary-300/10 hover:bg-gray-300/20 hover:text-accent-foreground focus:bg-secondary-300/10 focus:text-accent-foreground focus:outline-none"
                        >
                          Contact
                        </a>
                      </ul>
                    </div>
                  </nav>
                </nav>
              </div>

              {/* Sign in / Sign up buttons */}
              <div className="hidden items-center space-x-4 md:flex">
                <div className="flex items-center space-x-4">
                  <div className="m-0 p-0">
                    <a href="/signin">
                      <button className="inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-gray-400/40 bg-gray-300/10 hover:bg-gray-300/20 backdrop-blur-md h-10 px-4 py-2 rounded-none rounded-l-full">
                        Sign in
                      </button>
                    </a>
                    <a href="/signup">
                      <button className="inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-gray-400/40 bg-gray-300/10 hover:bg-gray-300/20 backdrop-blur-md h-10 px-4 py-2 rounded-none rounded-r-full">
                        Sign up
                      </button>
                    </a>
                  </div>
                </div>

                {/* Dark mode toggle button */}
                <div className="flex h-9 w-9 items-center justify-center duration-200">
                  <label className="flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-gray-600/50 duration-200 hover:bg-gray-400/20">
                    <input
                      className="hidden"
                      type="checkbox"
                      onChange={toggleDarkMode}
                      checked={isDarkMode}
                    />
                    {isDarkMode ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-moon-star h-5 w-5"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"></path>
                        <path d="M20 3v4"></path>
                        <path d="M22 5h-4"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sun h-5 w-5"
                      >
                        <circle cx="12" cy="12" r="5"></circle>
                        <path d="M12 1v2"></path>
                        <path d="M12 21v2"></path>
                        <path d="M4.22 4.22l1.42 1.42"></path>
                        <path d="M18.36 18.36l1.42 1.42"></path>
                        <path d="M1 12h2"></path>
                        <path d="M21 12h2"></path>
                        <path d="M4.22 19.78l1.42-1.42"></path>
                        <path d="M18.36 5.64l1.42-1.42"></path>
                      </svg>
                    )}
                  </label>
                </div>
              </div>

              <div className="md:hidden">
                <div className="md:hidden">
                  <button
                    onClick={toggleMenu}
                    className="inline-flex items-center gap-2 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 rounded-md hover:bg-secondary-300/10"
                    type="button"
                    data-state="closed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-menu h-6 w-6"
                    >
                      <line x1="4" x2="20" y1="12" y2="12"></line>
                      <line x1="4" x2="20" y1="6" y2="6"></line>
                      <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
