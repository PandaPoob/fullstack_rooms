"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FormattedCalenderEvent } from "@/app/_models/event";
import { useState } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import Modal from "@/app/_components/modals/Modal";
import CreateEventForm from "@/app/_components/forms/CreateEventForm";

interface CalendarViewProps {
  userEvents: FormattedCalenderEvent[] | null;
  roomOptions: { title: string; id: string }[];
}

function CalendarView({ userEvents, roomOptions }: CalendarViewProps) {
  const [events, setEvents] = useState(userEvents || []);
  const [isOpen, setIsOpen] = useState(false);
  const [chosenDate, setChosenDate] = useState("");

  const options = {
    eventBackgroundColor: "rgba(77, 101, 187, 0.3)",
    eventBorderColor: "rgba(77, 101, 187, 0.3)",
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  };

  return (
    <main>
      <div className="calendar-container font-body">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          dateClick={(event) => {
            if (!roomOptions) {
              alert("You must have at least one room to tie the event to");
            } else {
              setIsOpen(true);
              setChosenDate(event.dateStr);
            }
          }}
          editable={true}
          events={events && ([...events] as EventSourceInput)}
          {...(options as any)}
        />
      </div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <CreateEventForm roomOptions={roomOptions} chosenDate={chosenDate} />
        </Modal>
      )}
    </main>
  );
}
export default CalendarView;
