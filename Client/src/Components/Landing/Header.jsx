import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 p-3 transition-all duration-300 ease-in-out">
        <Navbar />
      </header>
    </>
  );
}
