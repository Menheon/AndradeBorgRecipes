import { useState, useEffect } from "react";
import PlayIcon from "@/assets/play.svg?react";
import PauseIcon from "@/assets/pause.svg?react";
import TimerResetIcon from "@/assets/timer-reset.svg?react";

const countdownTimeInSeconds = 60;
const countdownRegulateTimeInSeconds = 5;

const Countdown = () => {
  const [count, setCount] = useState(countdownTimeInSeconds);
  const [isActive, setIsActive] = useState(false);

  const resetTimer = () => {
    setCount(countdownTimeInSeconds);
    setIsActive(false);
  };

  const regulateTimer = (operation: "addition" | "subtract") => {
    if (operation === "addition") {
      setCount((currentCount) =>
        currentCount + countdownRegulateTimeInSeconds <= 0
          ? 0
          : currentCount + countdownRegulateTimeInSeconds,
      );
    } else {
      setCount((currentCount) =>
        currentCount - countdownRegulateTimeInSeconds <= 0
          ? 0
          : currentCount - countdownRegulateTimeInSeconds,
      );
    }
    setIsActive(false);
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isActive && count > 0) {
      timerId = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (!isActive && count !== 0) {
      clearTimeout(timerId);
    } else if (isActive && count === 0) {
      navigator.vibrate([1000, 500, 1000, 500, 1000, 500]);
    }
    return () => clearTimeout(timerId);
  }, [isActive, count]);

  return (
    <div className="flex select-none items-center gap-2">
      <button
        onClick={() => regulateTimer("subtract")}
        className="h-10 w-10 rounded-lg text-xl ring-2 ring-orange-500 transition-colors hover:ring-orange-600"
      >
        -{countdownRegulateTimeInSeconds}s
      </button>
      <button
        onClick={() => setIsActive((currentState) => !currentState)}
        className="
          rounded-lg
          focus-visible:outline-none
          focus-visible:ring-2 
          focus-visible:ring-orange-600"
      >
        {isActive ? (
          <PauseIcon className="h-12 w-12 fill-orange-500 transition-colors hover:fill-orange-600" />
        ) : (
          <PlayIcon className="h-12 w-12 fill-orange-500 transition-colors hover:fill-orange-600" />
        )}
      </button>
      <p
        className={`w-24 text-center  text-5xl font-bold ${count === 0 ? "animate-bounce text-red-600" : "text-orange-600"}`}
      >
        {count}
      </p>
      <button
        onClick={resetTimer}
        className="
          rounded-lg
          focus-visible:outline-none
          focus-visible:ring-2 
          focus-visible:ring-orange-600"
      >
        <TimerResetIcon className="h-12 w-12 fill-orange-500 transition-colors hover:fill-orange-600" />
      </button>
      <button
        onClick={() => regulateTimer("addition")}
        className="h-10 w-10 rounded-lg text-xl ring-2 ring-orange-500 transition-colors hover:ring-orange-600"
      >
        +{countdownRegulateTimeInSeconds}s
      </button>
    </div>
  );
};

export default Countdown;
