import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-900">
      <div className=" flex flex-col items-center gap-20 py-24">
        <h1 className="text-green-500 text-3xl font-light"> Webinar.gg</h1>
        <h1 className="text-white text-3xl">Verify Your Age</h1>
      </div>

      <div className="flex flex-col gap-y-7 items-center">
        <div className="flex flex-col items-center gap-y-4 text-white">
          <p className="font-light">
            Please confirm your birth year. This data will not be stored
          </p>
          <input
            className="rounded-lg w-[80%] px-7 py-2 border bg-blue-800"
            type="text"
            placeholder="Your birth year"
          />
        </div>
        <button className="text-white w-[21%] bg-slate-500 rounded-lg py-2">
          Continue
        </button>
      </div>
    </div>
  );
}

export default App;
