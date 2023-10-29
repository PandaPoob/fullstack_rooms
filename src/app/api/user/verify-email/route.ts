import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export async function PUT(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();

    console.log(body.token);
    //decode token
    //find user with email

    //if user already has verified throw error user is already verified
    //if user doesnt exist throw error
    //if token is expired throw error
    //else update user verified_at
    //return ok
  } catch (error) {
    console.error("Email verification failed:", error);
    //handle errors
    //res.status(400).json({ error: "Email verification failed" });
  }
}
