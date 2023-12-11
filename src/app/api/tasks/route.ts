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

    // Query the database to get the count of existing tasks
    const existingTasksCount = await db.taskItem.count();

    // Save the task item to the database
    const createdTaskItem = await db.taskItem.create({
      data: {
        text,
        task_widget_fk,
        order: existingTasksCount + 1,
        checked: false,
        created_by_fk: created_by_fk,
      },
    });

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
    console.log("inside put api");
    const updateBody = await req.json();
    const { id, checked, updated_by } = updateBody;

    // Assuming you have a Task model in your Prisma schema
    const existingTask = await db.taskItem.findUnique({
      where: { id: id },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Save the current order before updating
    const currentOrder = existingTask.order;

    // Update the task with the new order
    const updatedTask = await db.taskItem.update({
      where: { id: id },
      data: {
        checked,
        updated_by,
        order: currentOrder,
      },
    });

    // const body = await req.json();
    return NextResponse.json({ msg: "succes" }, { status: 200 });
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
    console.log("inside put api");
    const deleteBody = await req.json();
    console.log("Delete Body:", deleteBody);

    const { id } = deleteBody;
    console.log("Delete Body:", deleteBody);

    // Find the task to be deleted
    const taskToDelete = await db.taskItem.findUnique({
      where: {
        id: id,
      },
    });

    if (!taskToDelete) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const orderToDelete = taskToDelete.order;

    // Delete the task
    const deletedTask = await db.taskItem.delete({
      where: {
        id: id,
      },
    });

    // Update the order of the remaining tasks
    await db.taskItem.updateMany({
      where: {
        order: {
          gt: orderToDelete,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(
      { msg: "succes", deletedTask: deletedTask },
      { status: 200 }
    );
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
