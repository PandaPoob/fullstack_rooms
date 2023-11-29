import { authenticateUser } from "@/app/_utils/authentication/authenticateUser";
import createroomschema from "@/app/_utils/validation/schemas/create-room-schema";
import { db } from "@/lib/prisma-client";
import { Room } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const resp = await authenticateUser(req);

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
      include: {
        location: true,
        cover: true,
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

export async function POST(req: NextRequest) {
  try {
    //Validate user
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
    const body = await req.json();
    const { title, emails } = createroomschema.parse(body);

    const participants = [
      {
        is_favourited: false,
        user_id: user!.id,
      },
    ];

    const errors = [];
    //Validate emails
    for (const email of emails) {
      const existingUser = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        errors.push({ error: "Users not found", status: 404 });
      }

      if (email === user!.email) {
        errors.push({
          error: "Creator will already be added to room",
          status: 400,
        });
      }

      if (errors.length > 0) {
        return NextResponse.json(errors[0], { status: errors[0].status });
      } else {
        participants.push({
          is_favourited: false,
          user_id: existingUser!.id,
        });
      }
    }
    //Create room
    const newRoom = await db.room.create({
      data: {
        title: title,
        admin: { connect: { id: user!.id } },
        participants: {
          create: participants,
        },
        //Nested writes
        note_widget: {
          create: {},
        },
        task_widget: {
          create: {},
        },
      },
      include: {
        participants: {
          where: {
            user_id: {
              not: user!.id,
            },
          },
        },
      },
    });
    if (newRoom.participants.length !== 0) {
      const notifications = newRoom.participants.map(async (p) => {
        try {
          const notification = await db.notification.create({
            data: {
              read: false,
              user: { connect: { id: p.user_id } },
              meta_user: { connect: { id: user!.id } },
              meta_action: "created",
              meta_target: "room",
              meta_target_name: newRoom.title,
              meta_link: `/rooms/${newRoom.id}`,
            },
          });
          return notification;
        } catch (error) {
          console.error(
            `Error occurred while reating notification for ${p}:`,
            error
          );
          return null;
        }
      });
    }

    return NextResponse.json(
      {
        msg: "Room succesfully created",
        newRoom: newRoom,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      //Zod errors
      const validationErrors = error.errors.map((err) => {
        return {
          message: err.message,
        };
      });
      // Return a validation error response
      return NextResponse.json({ error: validationErrors }, { status: 400 });
    } else {
      //Other errors
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
