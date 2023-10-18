import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma-client";

export function requireAuthentication(
  page: (session: Session) => Promise<JSX.Element | undefined>
) {
  return async (sess: Session) => {
    const session = await getServerSession(authOptions);

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

    return page(session);
  };
}
