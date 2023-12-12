import { authenticateUser } from "@/app/_utils/authentication/authenticateUser";
import { db } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //validate user
    const resp = await authenticateUser(req);

    if (resp.status !== 200) {
      const msg = resp.data.msg;

      return NextResponse.json(
        {
          error: msg,
        },
        { status: resp.status }
      );
    }
    const { user } = resp.data;

    const userEvents = await db.user.findUnique({
      // Optionally, you can specify query parameters here
      where: {
        id: user!.id,
      },
      include: {
        eventsAttending: true,
      },
    });

    console.log(userEvents?.eventsAttending);
    //return user's events

    return NextResponse.json(
      {
        msg: "Ok",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}
