"use client";
import React, { useState, useEffect } from "react";

const FlashTimer = ({ endTime }: any) => {
  // Parse the endTime prop
  const targetDate = new Date(endTime).getTime();

  // State to store the remaining time
  const [timeLeft, setTimeLeft] = useState(0);

  // Update the timer every second
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      setTimeLeft(distance > 0 ? distance : 0);
    };

    updateTimer(); // Initialize the timer immediately on mount

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Helper function to calculate days, hours, minutes, and seconds
  const getTimeParts = (time: any) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeParts(timeLeft);

  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-baseline">
          <div className="text-xs">Days</div>
          <div className="flex gap-5">
            <div className="font-bold text-xl md:text-2xl lg:3xl">
              {days.toString().padStart(2, "0")}
            </div>
            <div className="text-xl md:text-2xl lg:3xl font-bold">:</div>
          </div>
        </div>
        <div className="flex flex-col items-baseline">
          <div className="text-xs">Hours</div>
          <div className="flex gap-5">
            <div className="font-bold text-xl md:text-2xl lg:3xl">
              {hours.toString().padStart(2, "0")}
            </div>
            <div className="text-xl md:text-2xl lg:3xl font-bold">:</div>
          </div>
        </div>
        <div className="flex flex-col items-baseline">
          <div className="text-xs">Minutes</div>
          <div className="flex gap-5">
            <div className="font-bold text-xl md:text-2xl lg:3xl">
              {minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xl md:text-2xl lg:3xl font-bold">:</div>
          </div>
        </div>
        <div className="flex flex-col items-baseline">
          <div className="text-xs">Seconds</div>
          <div className="flex gap-5">
            <div className="font-bold text-xl md:text-2xl lg:3xl">
              {seconds.toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashTimer;
