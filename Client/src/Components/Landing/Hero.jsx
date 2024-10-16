import React from "react";
import { Vortex } from "../ui/vortex";

export default function Hero() {
  return (
    <div className=" mx-auto h-[40rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Your Journey to Mental Wellness Starts Here
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Track your mood, access resources, and connect with professionals.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button href="/getstarted" className="px-4 py-2 bg-slate-500 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Get Started
          </button>
        </div>
      </Vortex>
    </div>
  );
}
