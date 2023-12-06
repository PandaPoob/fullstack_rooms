import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NoteWidget } from "@prisma/client";
import { NoteItem } from "@prisma/client";
import { db } from "@/lib/prisma-client";
import NoteCard from "@/app/_views/Notes/NoteCard";
import Notes from "@/app/_views/Notes/test2";
import NoteView from "@/app/_views/Notes/test2";
import NoteList from "@/app/_views/Notes/NoteList";
import Notestest from "@/app/_views/Notes";

// Fat i params
// Params = NoteWidget id
// find many note items, som tilhører den notewidget

async function getData(params: { slug: string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  if (!params.slug) {
    redirect("/error");
  }

  const notes = await db.noteItem.findMany({
    where: {
      note_widget: { room_fk: params!.slug as string },
    },
  });
  if (!notes) {
    redirect("/error");
  }

  const data = {
    session,
    notes,
  };
  return data;
}

async function NotePage({ params }: { params: { slug: string } }) {
  const data = await getData(params);
  // console.log(data.notes);
  return (
    data && (
      <>
        <Notes room_id={params.slug} notes={data.notes}></Notes>
        {/* <NotesView notes={data.notes} sessionUser={data.session.user} /> */}
      </>
    )
  );
}
export default NotePage;
