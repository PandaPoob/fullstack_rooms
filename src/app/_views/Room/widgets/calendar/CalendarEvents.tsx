import { ExpandedEvent } from "@/app/_models/event";
import { formatTime } from "@/app/_utils/helpers/date";
import Link from "next/link";

interface CalendarEventsProps {
  events: ExpandedEvent[];
}

function CalendarEvents({ events }: CalendarEventsProps) {
  return (
    <div
      className={`mt-4 lg:max-h-[23rem] ${
        events.length > 4 && "overflow-y-scroll pb-5"
      }`}
    >
      {events.length === 0 ? (
        <div>No events during this day</div>
      ) : (
        <ul className="grid gap-2">
          {events.map((e) => (
            <li
              key={e.id}
              className="bg-primary relative grid content-center rounded-xl"
            >
              <Link
                href={`/rooms/${e.room_id}/events/${e.id}`}
                className="min-h-[5rem] flex items-center justify-between rounded-xl transition px-5 hover:bg-white hover:bg-opacity-10"
              >
                <span className="grid">
                  <span className="absolute bg-link bg-opacity-50 h-2 w-2 top-2 left-2 rounded-full"></span>
                  <span className="text-lg font-medium">{e.title}</span>
                  <span className="text-base text-darkGrey">
                    {e.description}
                  </span>
                </span>
                <span>{formatTime(e.start_time)}</span>
              </Link>
            </li>
          ))}
          <span className="absolute h-10 bottom-0 left-0 w-full bg-bg-gradient"></span>
        </ul>
      )}
    </div>
  );
}

export default CalendarEvents;
