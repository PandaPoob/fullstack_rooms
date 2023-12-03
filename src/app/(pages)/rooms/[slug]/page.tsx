import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RoomView from "@/app/_views/Room";
import { Participant } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function updateVisitedAt(participant: Participant) {
  try {
    await db.participant.update({
      where: {
        id: participant.id,
      },
      data: {
        visited_at: new Date().toISOString(),
      },
    });

    revalidatePath("/rooms");
  } catch (error) {
    console.error("Error updating visited_at:", error);
  }
}

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
        note_item: true,
      },
    });

    const participant = await db.participant.findFirst({
      where: {
        room_id: params.slug as string,
        user_id: session.user.id as string,
      },
    });

    if (participant) {
      // Call the function to update visited_at
      await updateVisitedAt(participant);
    }

    const data = {
      room,
      session,
      note: notes?.note_item[0],
    };

    return data;
  }
}

async function RoomPage({ params }: { params: { slug: string } }) {
  const data = await getData(params);

  return (
    data && (
      <RoomView
        room={data.room}
        note={data.note}
        sessionUser={data.session.user}
      />
    )
  );
}

export default RoomPage;
