import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma-client";
import Notes from "@/app/_views/Notes";

async function getData(params: { slug: string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  if (!params.slug) {
    redirect("/error");
  }

  const notes = await db.noteWidget.findUnique({
    where: {
      room_fk: params.slug,
    },
    include: {
      note_item: true,
    },
  });
  if (!notes) {
    redirect("/error");
  }

  const data = {
    session,
    notes: notes.note_item,
    noteWidgetId: notes.id,
  };
  return data;
}

async function NotePage({ params }: { params: { slug: string } }) {
  const data = await getData(params);
  return (
    data && (
      <Notes
        room_id={params.slug}
        notes={data.notes}
        noteWidgetId={data.noteWidgetId}
      />
    )
  );
}
export default NotePage;
