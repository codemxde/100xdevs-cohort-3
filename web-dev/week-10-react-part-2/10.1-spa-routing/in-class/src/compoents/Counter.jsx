import { useRef, useState } from "react";

export default function Counter() {
  const [timer, setTimer] = useState(0);
  const interval = useRef(0);

  const startTimer = () => {
    interval.current = setInterval(() => {
      setTimer((previous) => previous + 1);
    }, 1000);
  };

  const clearTimer = () => {
    clearInterval(interval.current);
    setTimer(0);
  };

  const stopRef = useRef();
  const startRef = useRef();
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-2xl">Creating a Timer</h1>

      <div className="flex flex-col gap-y-3 justify-around items-center bg-red-100 w-[20%] h-[10rem] rounded-xl">
        <h1 className="text-2xl">{timer}</h1>
        <div className="flex justify-around w-[40%]">
          <button
            ref={startRef}
            onClick={startTimer}
            className="p-2 bg-blue-200 rounded-lg"
          >
            Start
          </button>
          <button
            ref={stopRef}
            onClick={clearTimer}
            className="p-2 bg-blue-200 rounded-lg"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
