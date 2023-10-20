"use client";
import LiveClock from "react-live-clock";

function DigitalClockHeader({ title }: { title: string }) {
  return (
    <div className="hidden md:block pt-7 md:mb-20">
      <LiveClock
        className="text-display font-semibold"
        ticking={true}
        noSsr
        format={"HH:mm"}
      />
      <h2 className="text-h3 mt-2">{title}</h2>
    </div>
  );
}

export default DigitalClockHeader;
