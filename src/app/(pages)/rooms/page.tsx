import { requireAuthentication } from "@/app/_middleware/authentication";
import Rooms from "@/app/_views/Rooms";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RoomsPage() {
  //Validate and getSession
  const session = await requireAuthentication(authOptions);

  return <Rooms sessionUser={session.user} />;
}
