import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function authenticateUser(req: NextRequest) {
  //to use this: token from headers authorization

  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: req, secret: secret, raw: true });

  //Validate token
  if (!token) {
    return {
      data: {
        msg: "Unauthorized - Invalid token",
      },
      status: 401,
    };
  }

  const tokenId = token.sub;

  //Validate server-side session
  const session = await getServerSession(authOptions);

  if (!session || (session.user.id as string) !== token) {
    console.log("session:", session?.user.id, "token:", token);
    return {
      data: {
        msg: "Forbidden - Session mismatch",
      },
      status: 403,
    };
  }

  //Get user
  const user = await db.user.findUnique({
    where: {
      id: session.user.id as string,
    },
    include: {
      avatar: true,
    },
  });

  return { data: { msg: "ok", user }, status: 200 };
}
