import { db } from "@/lib/prisma-client";
import * as z from "zod";
import { NextResponse } from "next/server";
import taskcreateschema from "@/app/_utils/validation/schemas/backend/task-create-schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // const { text, task_widget_fk, created_by_fk } = body;
    const { text, task_widget_fk, created_by_fk } =
      taskcreateschema.parse(body);

    // Save the task item to the database
    /*     const createdTaskItem = await db.taskItem.create({
      data: {
        text,
        task_widget_fk,
        order: 3,
        checked: false,
        created_by_fk: created_by_fk,
      },
    });
 */
    // hent latest created_at - asc - tag den order og sige +1 - laves i api
    return NextResponse.json({ msg: "Ok" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ msg: "Ok" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
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

export async function DELETE(req: Request) {
  try {
    const deleteBody = await req.json();
    const { id } = deleteBody;

    // Use Prisma's delete method to delete the task by ID
    const findAndDeletedTask = await db.taskItem.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ msg: "Ok" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
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
