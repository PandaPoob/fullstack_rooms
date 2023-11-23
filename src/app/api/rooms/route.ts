import { authenticateUser } from "@/app/_utils/authentication/authenticateUser";
import { db } from "@/lib/prisma-client";
import { Room } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({
        msg: "Required params not valid",
        status: 400,
      });
    }

    const resp = await authenticateUser(userId, req);

    if (resp.status !== 200) {
      const msg = resp.data.msg;

      return NextResponse.json(
        {
          msg: msg,
        },
        { status: resp.status }
      );
    }
    const { user } = resp.data;

    if (!user) {
      return NextResponse.json({ msg: "User not found", status: 404 });
    }

    //fetch rooms
    const rooms = await db.room.findMany({
      where: {
        participants: {
          some: {
            user_id: user.id as string,
          },
        },
      },
      select: {
        id: true,
        title: true,
        created_at: true,
        updated_at: true,
        admin_fk: true,
        location: true,
        cover_img: true,
        participants: {
          select: {
            visited_at: true,
            user_id: true,
          },
        },
      },
    });
    //sort rooms
    const sortedRooms = rooms.slice().sort((a, b) => {
      const participantA = a.participants.find(
        (participant) => participant.user_id === user.id
      );

      const participantB = b.participants.find(
        (participant) => participant.user_id === user.id
      );

      const visitedAtA = participantA?.visited_at
        ? new Date(participantA.visited_at)
        : null;
      const visitedAtB = participantB?.visited_at
        ? new Date(participantB.visited_at)
        : null;

      if (visitedAtA && visitedAtB) {
        return visitedAtB.getTime() - visitedAtA.getTime();
      } else if (visitedAtA) {
        return -1;
      } else if (visitedAtB) {
        return 1;
      } else {
        return 0;
      }
    });
    return NextResponse.json(
      {
        data: sortedRooms as Room[],
        msg: "Ok",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    //authenticate user
    //validate data
    //create room
    //create avatar (if any)
    //create participants
    //create widgets
    ////note widget
    ////task widget
  } catch (error) {
    console.error(error);
  }
}
