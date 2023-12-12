import { requireAuthentication } from "@/app/_middleware/authentication";
import { FormattedCalenderEvent } from "@/app/_models/event";
import CalendarView from "@/app/_views/Calendar";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

async function getData(id: string) {
  const userEvents = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      eventsAttending: {
        select: {
          event: {
            select: {
              id: true,
              title: true,
              start_time: true,
              end_time: true,
              all_day: true,
              room_id: true,
            },
          },
        },
      },
    },
  });

  if (userEvents?.eventsAttending && userEvents.eventsAttending.length !== 0) {
    const formattedEvents: FormattedCalenderEvent[] =
      userEvents.eventsAttending.map((event) => {
        const formattedEvent: FormattedCalenderEvent = {
          id: event.event.id,
          url: `/rooms/${event.event.room_id}/events/${event.event.id}`,
          start: event.event.start_time,
          title: event.event.title,
          allDay: event.event.all_day,
        };

        if (event.event.end_time) {
          formattedEvent.end = event.event.end_time;
        }

        return formattedEvent;
      });

    return formattedEvents;
  } else {
    return null;
  }
}

async function CalendarPage() {
  const session = await requireAuthentication(authOptions);
  const data = await getData(session.user.id as string);

  return <CalendarView userEvents={data} />;
}

export default CalendarPage;
