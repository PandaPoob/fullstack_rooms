import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function authenticateUser(userId: string, req: NextRequest) {
  //to use this:
  //-userid from params
  //-token from headers authorization
  const secret = process.env.SECRET;
  const token = await getToken({ req: req, secret: secret, raw: true });

  if (!token) {
    return {
      data: {
        msg: "Unauthorized - Invalid token",
      },
      status: 401,
    };
  }

  //Validate user ID from url
  if (token !== userId) {
    return {
      data: {
        msg: "Forbidden - User ID mismatch",
      },
      status: 403,
    };
  }

  //Validate server-side session
  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== userId) {
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
      id: userId as string,
    },
    include: {
      avatar: true,
    },
  });

  return { data: { msg: "ok", user }, status: 200 };
}
