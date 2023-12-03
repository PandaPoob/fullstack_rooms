import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import * as jsonwebtoken from "jsonwebtoken";
import { TokenInterface } from "@/app/_models/token";

export async function authenticateUser(req: NextRequest) {
  //to use this: token from headers authorization

  const secret = process.env.NEXTAUTH_SECRET;
  let token;
  token = await getToken({ req: req, secret: secret, raw: true });

  if (process.env.NODE_ENV !== "development") {
    console.log("vercel here");
    console.log(secret);
    const decoded = jsonwebtoken.verify(token, secret!) as TokenInterface;
    console.log(decoded);
    token = decoded;
  }

  //Validate token
  if (!token) {
    return {
      data: {
        msg: "Unauthorized - Invalid token",
      },
      status: 401,
    };
  }

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
