import { requireAuthentication } from "@/app/_middleware/authentication";
import EventView from "@/app/_views/Events";
import { authOptions } from "@/lib/auth";

async function getData(id: string) {}

async function EventPage() {
  const session = await requireAuthentication(authOptions);
  const data = await getData(session.user.id as string);

  return <EventView />;
}

export default EventPage;
