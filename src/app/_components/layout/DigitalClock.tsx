"use client";
import LiveClock from "react-live-clock";

function DigitalClock() {
  return (
    <LiveClock
      className="text-display font-semibold"
      ticking={true}
      noSsr
      format={"HH:mm"}
    />
  );
}

export default DigitalClock;
