import { requireAuthentication } from "@/app/_middleware/authentication";
import { ExtendedRoom } from "@/app/_models/room";
import Settings from "@/app/_views/Settings";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { User } from "next-auth";
import { redirect } from "next/navigation";

async function getData(params: { slug: string }, user: User) {
  if (!params.slug) {
    redirect("/error");
  } else {
    const room = await db.room.findUnique({
      where: {
        id: params.slug as string,
        participants: {
          some: {
            user_id: user.id as string,
          },
        },
      },
      include: {
        cover: true,
      },
    });

    if (!room) {
      redirect("/error");
    }
    if (room.admin_fk !== user.id) {
      redirect("/error");
    }

    return { room: room };
  }
}

async function SettingsPage({ params }: { params: { slug: string } }) {
  const session = await requireAuthentication(authOptions, params.slug);
  const data = await getData(params, session.user);

  return <> {data && <Settings roomData={data.room as ExtendedRoom} />}</>;
}

export default SettingsPage;
