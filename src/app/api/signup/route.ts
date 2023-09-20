import { db } from "@/lib/prisma-client";
import { hash } from "bcrypt";
import * as z from "zod";
import createuserschema from "../../_utils/validation/schemas/create-user-schema";
import { UserCreateInput } from "@/lib/prisma-types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, password, birthday } =
      //passing body through zod validation schema
      createuserschema.parse(body);

    //email unique                   //prisma
    const emailAlreadyExists = await db.user.findUnique({
      where: { email: email },
    });


    if (emailAlreadyExists) {
      return NextResponse.json(
        {
          user: null,
          msg: "This email is already in use",
        },
        //409 is used when a request conflicts with the current state of server
        { status: 409 }
      );
    
    }
    //HASHING PW
    const hashedPassword = await hash(password, 10);

    //DEFAULT ID AVAILABLE
    const defaultStatusId = "clmp41qr50000v9fwfcjsv0q1";

    //NEW USER
    const newUser = await db.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        birthday,
        status: { connect: { id: defaultStatusId } },
      },
    } as UserCreateInput);
    //SUCCESS
    return NextResponse.json(
      {
        user: newUser,
        msg: "Succesfully created new user",
      },
      { status: 201 }
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
