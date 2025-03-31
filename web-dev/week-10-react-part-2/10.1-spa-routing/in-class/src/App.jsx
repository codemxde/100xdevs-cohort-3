import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./compoents/Counter";

function App() {
  return (
    <div>
      <h1 className="text-sky-700 text-center p-2 py-3 text-2xl font-medium">
        Hello Buddy! 😙
      </h1>
      <Counter />
    </div>
  );
}

export default App;
