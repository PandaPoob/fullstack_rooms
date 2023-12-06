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
  return data && <Notes room_id={params.slug} notes={data.notes}></Notes>;
}
export default NotePage;
