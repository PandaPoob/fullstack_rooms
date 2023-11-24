import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NoteWidget } from "@prisma/client";
import { NoteItem } from "@prisma/client";
import { db } from "@/lib/prisma-client";
import NoteCard from "@/app/_views/Notes/NoteCard";
import Notes from "@/app/_views/Notes/index";
import NoteView from "@/app/_views/Notes/index";

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

  const notes = await db.noteWidget.findUnique({
    where: {
      id: params.slug as string,
    },
    include: {
      noteItem: true,
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
        <NoteView notes={data.notes} sessionUser={data.session.user} />
      </>
    )
  );
}
export default NotePage;
