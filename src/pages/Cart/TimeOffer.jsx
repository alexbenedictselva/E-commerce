import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime }) => {
  const [time, setTime] = useState(Number(initialTime)); 

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1); // Decrement time every second
    }, 1000);

    // Cleanup the interval on component unmount or when time reaches 0
    return () => clearInterval(timer);
  }, [time]);

  // Format the time in hours, minutes, and seconds
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div>
      <h1>Time Left: {formatTime(time)}</h1>
    </div>
  );
};

export default CountdownTimer;
