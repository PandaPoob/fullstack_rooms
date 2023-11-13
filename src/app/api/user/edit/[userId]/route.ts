import edituserschema from "@/app/_utils/validation/schemas/user-edit-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getToken } from "next-auth/jwt";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Extract user ID from URL (slug)
    const { userId } = params;

    const secret = process.env.SECRET;
    const token = await getToken({ req: req, secret: secret, raw: true });

    if (!token) {
      return NextResponse.json(
        {
          msg: "Unauthorized - Invalid token",
        },
        { status: 401 }
      );
    }
    console.log(token, userId);
    // Validate user ID from URL
    if (token !== userId) {
      return NextResponse.json(
        {
          msg: "Forbidden - User ID mismatch",
        },
        { status: 403 }
      );
    }

    // Validate server-side session
    const session = await getServerSession(authOptions);
    if (!session || session.user.id !== userId) {
      return NextResponse.json(
        {
          msg: "Forbidden - Session mismatch",
        },
        { status: 403 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id as string,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          msg: "User not found",
        },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { first_name, last_name, birthday } = edituserschema.parse(body);

    const updates: { [key: string]: any } = {};

    // Compare and update each attribute
    if (first_name !== user.first_name) {
      updates.first_name = first_name;
    }

    if (last_name !== user.last_name) {
      updates.last_name = last_name;
    }

    if (birthday !== user.birthday) {
      updates.birthday = birthday;
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          msg: "No changes made",
        },
        { status: 200 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: updates,
      select: {
        first_name: updates.first_name ? true : false,
        last_name: updates.last_name ? true : false,
        birthday: updates.last_name ? true : false,
      },
    });

    const sessionUpdates: { [key: string]: any } = {};

    // Conditionally add first_name and last_name if they exist on updatedUser
    if (updatedUser.first_name) {
      sessionUpdates.first_name = updatedUser.first_name;
    }

    if (updatedUser.last_name) {
      sessionUpdates.last_name = updatedUser.last_name;
    }

    return NextResponse.json(
      {
        updatedUser: { updatedUser },
        sessionUpdates: sessionUpdates,
        msg: "Succesfully updated user",
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
