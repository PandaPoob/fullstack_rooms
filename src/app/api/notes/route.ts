import { db } from "@/lib/prisma-client";
import * as z from "zod";
import createnoteschema from "../../_utils/validation/schemas/create-note-schema";
import { NextResponse, NextRequest } from "next/server";

// Handle POST requests
export async function POST(req: Request) {
  try {
    // Validation schema
    const body = await req.json();
    console.log(body);
    const { title, text, note_widget_fk } = createnoteschema.parse(body);
    // console.log("Parsed request body:", { title, text, note_widget_fk });
    const defaultStatusId = "clmp41qr50000v9fwfcjsv0q1";

    // Post a new note to the database
    const newNote = await db.noteItem.create({
      data: {
        title,
        text,
        note_widget: {
          connect: { id: note_widget_fk },
        },
      },
    });

    // Return a success response with the created note
    return NextResponse.json(
      {
        note: newNote,
        msg: "Note created",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation errors
      const validationErrors = error.issues.map((issue) => {
        return {
          message: issue.message,
        };
      });

      // Return a validation error response
      return NextResponse.json({ error: validationErrors }, { status: 400 });
    } else {
      // Other errors
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

// Handle DELETE requests
export async function DELETE(req: Request) {
  try {
    const noteId = await req.json();

    // Prisma delete the note ID
    await db.noteWidget.delete({
      where: {
        id: noteId,
      },
    });

    // Success response for note deletion
    return NextResponse.json(
      {
        msg: "Note deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation errors
      const validationErrors = error.issues.map((issue) => {
        return {
          message: issue.message,
        };
      });

      // Return a validation error response
      return NextResponse.json({ error: validationErrors }, { status: 400 });
    } else {
      // Other errors
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

// export async function POST(req: Request) {
//   try {
//     // Validation schema
//     const body = await req.json();
//     const { title, text, note_widget_fk } = createnoteschema.parse(body);

//     const defaultStatusId = "clmp41qr50000v9fwfcjsv0q1";

//     // Post to the database
//     const newNote = await db.noteItem.create({
//       data: {
//         title,
//         text,
//         note_widget: {
//           connect: { id: defaultStatusId },
//         },
//       },
//     });

//     // SUCCESS
//     return NextResponse.json(
//       {
//         note: newNote,
//         msg: "Note created",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       // Zod errors
//       const validationErrors = error.errors.map((err) => {
//         return {
//           message: err.message,
//         };
//       });

//       // Return a validation error response
//       return NextResponse.json({ error: validationErrors }, { status: 400 });
//     } else {
//       // Other errors
//       console.error(error);
//       return NextResponse.json(
//         { error: "Internal Server Error" },
//         { status: 500 }
//       );
//     }
//   }
// }
