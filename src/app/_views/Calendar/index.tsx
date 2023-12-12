"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
//import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FormattedCalenderEvent } from "@/app/_models/event";
import { useState } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";

interface CalendarViewProps {
  userEvents: FormattedCalenderEvent[] | null;
}

function CalendarView({ userEvents }: CalendarViewProps) {
  const [events, setEvents] = useState(userEvents || []);
  //const [isHovered, setIsHovered] = useState(false);

  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    //create an event here
    console.log(arg);
    alert(arg.dateStr);
  };

  const dateTest = new Date();
  //console.log(dateTest);
  const options = {
    eventBackgroundColor: "rgba(77, 101, 187, 0.3)",
    eventBorderColor: "rgba(77, 101, 187, 0.3)",
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  };

  /*   const handleEventHover = (event: any) => {
    setIsHovered((prevIsHovered) => !prevIsHovered);
    console.log("event hover", event.event._def.publicId);
  }; */

  return (
    <main className="relative">
      <div className="calendar-container font-body">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          editable={true}
          events={events && ([...events] as EventSourceInput)}
          {...(options as any)}
          //eventMouseEnter={(event) => handleEventHover(event)}
          //eventMouseLeave={(event) => handleEventHover(event)}
        />
      </div>

      {/*       <div
        className={`${
          isHovered ? "fixed bottom-0 left-0 w-full bg-primary" : "hidden"
        }`}
      >
        event data here
      </div> */}
    </main>
  );
}
export default CalendarView;
