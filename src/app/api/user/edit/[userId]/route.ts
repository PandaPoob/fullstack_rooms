import edituserschema from "@/app/_utils/validation/schemas/user-edit-schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getToken } from "next-auth/jwt";
import backendedituserschema from "@/app/_utils/validation/schemas/backend-user-edit-schema";
import { UserEdit } from "@/app/_models/user";

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

    //with user id
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

    console.log(user);

    const formDataToObject = (body: FormData): Record<string, unknown> => {
      const object: Record<string, unknown> = {};
      body.forEach((value: FormDataEntryValue, key: string) => {
        object[key] = value;
      });
      return object;
    };

    const body = await req.formData();
    const bodyObject = formDataToObject(body);

    const { first_name, last_name, birthday, status, avatar_img } =
      await backendedituserschema.parseAsync(bodyObject);

    if (avatar_img) {
      const formData = new FormData();
      formData.append("file", avatar_img);
      formData.append("upload_preset", "fullstack-rooms");
      //validate magic type

      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/dceom4kf4/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!resp.ok) {
        return NextResponse.json(
          {
            msg: "An error occurred regarding image upload",
          },
          { status: 500 }
        );
      }
      const data = await resp.json();
      //if image is small

      let newImageUrl;
      const url = data.secure_url.split("upload/");

      if (data.width < 400 || data.height < 400) {
        newImageUrl = `${url[0]}upload/w_400,h_400,c_scale/${url[1]}`;
      } else if (data.width > 400 || data.height > 400) {
        newImageUrl = `${url[0]}upload/w_400,h_400,c_crop/${url[1]}`;
      } else if (data.width === 400 && data.height === 400) {
        newImageUrl = data.secure_url;
      }
    }

    //if there is new image update image

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

    if (status !== user.status_fk) {
      updates.status = { connect: { id: status } };
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          msg: "No changes made",
        },
        { status: 200 }
      );
    }

    //updated at

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: updates,
      select: {
        first_name: updates.first_name ? true : false,
        last_name: updates.last_name ? true : false,
        birthday: updates.last_name ? true : false,
        status: updates.status ? true : false,
      },
    });
    //if old image is no default delete old image

    /*     const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dceom4kf4/image/destroy`;

    const publicId = "your_image_public_id";

    fetch(`${cloudinaryUrl}/${publicId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`, // Replace with your API key and secret
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Image deleted successfully");
        } else {
          console.error("Failed to delete image");
        }
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
 */
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
