import { requireAuthentication } from "@/app/_middleware/authentication";
import { ExpandedNoteItem } from "@/app/_models/notes";
import Note from "@/app/_views/Notes/Note";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { redirect } from "next/navigation";

// This slug is the singleview of the note

// include formatting på linje 12 ish

async function getData(noteId: string) {
  const noteItem = await db.noteItem.findUnique({
    where: {
      id: noteId,
    },
    include: {
      text_format: true,
      title_format: true,
      title_alignment: true,
      text_alignment: true,
    },
  });

  if (!noteItem) {
    redirect("/error");
  }

  const data = {
    noteItem: noteItem as ExpandedNoteItem,
  };
  return data;
}

async function NotePage({
  params,
}: {
  params: { slug: string; noteId: string };
}) {
  const session = await requireAuthentication(authOptions, params.slug);
  const data = await getData(params.noteId);

  return <Note noteItem={data.noteItem} roomId={params.slug} />;
}

export default NotePage;
