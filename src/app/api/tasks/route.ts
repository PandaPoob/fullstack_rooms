import { db } from "@/lib/prisma-client";
import { UserId } from "@/app/_models/user";
import { notifyUsers } from "@/app/_utils/apis/notification";
import { authenticateUser } from "@/app/_utils/authentication/authenticateUser";
import * as z from "zod";
import { NextRequest, NextResponse } from "next/server";
import taskcreateschema from "@/app/_utils/validation/schemas/backend/task-create-schema";

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
    // const { text, task_widget_fk, created_by_fk } = body;
    const { text, task_widget_fk, created_by_fk, roomId } =
      taskcreateschema.parse(body);
    // console.log("api", body);

    // Finding the room that belongs to roomId
    const room = await db.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json(
        {
          error: "Room not found",
        },
        { status: 404 }
      );
    }

    // Query the database to get the count of existing tasks
    const existingTasksCount = await db.taskItem.count();

    // Create task
    const createdTask = await db.taskItem.create({
      data: {
        text: text,
        task_widget_fk,
        order: existingTasksCount + 1,
        checked: false,
        created_by_fk: created_by_fk,
      },
    });

    // Check that user.id exist in participants
    const isUserParticipant = room.participants.some(
      (p) => p.user_id === user!.id
    );

    if (!isUserParticipant) {
      return NextResponse.json(
        {
          error: "User is not a participant in the room",
        },
        { status: 403 }
      );
    }

    // This is the room participant without the creator of the task
    const otherParticipations = room.participants.filter(
      (p) => p.user_id !== user!.id
    );

    // Create notifications
    if (otherParticipations.length !== 0) {
      const notifications = await Promise.all(
        otherParticipations.map(async (p) => {
          try {
            const notification = await db.notification.create({
              data: {
                read: false,
                user: { connect: { id: p.user_id } },
                meta_user: { connect: { id: user!.id } },
                meta_action: "created",
                meta_target: "task",
                meta_target_name: createdTask.text,
                meta_link: `/rooms/${room.id}/?modal=true`,
              },
              select: {
                user_id: true,
              },
            });
            return notification;
          } catch (error) {
            console.error(
              `Error occurred while creating notification for ${p}:`,
              error
            );
            return null;
          }
        })
      );
      console.log("noti", notifications);

      const notificationResult = await notifyUsers(notifications as UserId[], {
        msg: "Added to room!",
      });

      if (!notificationResult.success) {
        console.error("Error: Pusher notification trigger for task actions");
      }
    }

    return NextResponse.json(
      { msg: "success", createdTask: createdTask },
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
    return NextResponse.json(
      { msg: "succes", updatedTask: updatedTask },
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
