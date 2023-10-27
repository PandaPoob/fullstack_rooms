import { db } from "@/lib/prisma-client";
import * as z from "zod";
import createnoteschema from "../../_utils/validation/schemas/create-note-schema";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Validation schema
    const body = await req.json();
    const { title, text } = createnoteschema.parse(body);
    console.log(body);

    // Post to the database
    const newNote = await db.notesItems.create({
      data: {
        title,
        text,
      },
    });

    // SUCCESS
    return NextResponse.json(
      {
        note: newNote,
        msg: "Note created",
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
