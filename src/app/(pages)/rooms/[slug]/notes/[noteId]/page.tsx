import { requireAuthentication } from "@/app/_middleware/authentication";
import Note from "@/app/_views/Notes/Note";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { redirect } from "next/navigation";

async function getData(noteId: string) {
  const noteItem = await db.noteItem.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!noteItem) {
    redirect("/error");
  }

  const data = {
    noteItem,
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

  return <Note data={data} />;
}

export default NotePage;
