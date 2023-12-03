import { requireAuthentication } from "@/app/_middleware/authentication";
import NotesView from "@/app/_views/Notes";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { User } from "next-auth";

async function getData(params: { slug: string }, sessionUser: User) {
  const notes = await db.noteItem.findMany({
    where: {
      note_widget: {
        room_fk: params.slug,
      },
    },
  });

  const data = {
    notes,
  };

  return data;
}

async function NotesPage({ params }: { params: { slug: string } }) {
  const session = await requireAuthentication(authOptions, params.slug);
  const data = await getData(params, session.user);

  return <NotesView notes={data.notes} roomId={params.slug} />;
}

export default NotesPage;
