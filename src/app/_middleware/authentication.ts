import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma-client";

export async function requireAuthentication(authOptions: any) {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) {
    redirect("/");
  }
  //Check if user exists
  const user = await db.user.findUnique({
    where: {
      id: session.user.id as string,
    },
  });

  if (!user) {
    redirect("/error");
  }

  return session;
}
