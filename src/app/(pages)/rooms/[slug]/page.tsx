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
      include: {
        cover: true,
        location: true,
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

    const taskWidget = await db.taskWidget.findUnique({
      where: {
        room_fk: room.id,
      },
      include: {
        task_item: true,
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
      tasks: taskWidget?.task_item,
      taskWidgetId: taskWidget!.id as string,
      note: notes?.note_item[0],
    };

    return data;
  }
}

type RoomPageProps = {
  searchParams: { modal: string } | undefined | null;
  params: { slug: string };
};

async function RoomPage({ params, searchParams }: RoomPageProps) {
  const data = await getData(params);

  return (
    data && (
      <RoomView
        room={data.room}
        sessionUser={data.session.user}
        modalParams={searchParams}
        taskWidgetId={data.taskWidgetId}
        tasks={data.tasks}
        noteItem={data?.note}
      />
    )
  );
}

export default RoomPage;
