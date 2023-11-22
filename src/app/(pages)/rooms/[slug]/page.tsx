import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RoomView from "@/app/_views/Room";
import { NoteItem } from "@prisma/client";
import { NoteWidget } from "@prisma/client";
import NoteCard from "@/app/_views/Notes/NoteCard";

async function getData(params: { slug: string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  if (!params.slug) {
    redirect("/error");
  } else {
    const room = await db.room.findUnique({
      where: {
        id: params.slug as string,
        participants: {
          some: {
            user_id: session.user.id as string,
          },
        },
      },
    });

    if (!room) {
      redirect("/error");
    }

    // Fetch data for NoteWidget and NoteItem
    const notes = await db.noteWidget.findUnique({
      where: {
        room_fk: room.id,
      },
      include: {
        noteItem: true,
      },
    });
    console.log(notes);

    const data = {
      room,
      session,
      notes,
    };

    return data;
  }
}

async function RoomPage({ params }: { params: { slug: string } }) {
  const data = await getData(params);
  console.log(data.room);

  // Render RoomView, NoteWidget, and NoteItems
  return (
    data && (
      <>
        <RoomView
          room={data.room}
          notes={data.notes}
          sessionUser={data.session.user}
        />
      </>
    )
  );
}

export default RoomPage;
