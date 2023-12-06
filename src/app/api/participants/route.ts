import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    //validate user
    //validate that user is admin
    //validate maximum number of participants in room
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    //validate user
    //validate that user is admin
    //validate that user cant delete themselves
  } catch (error) {
    console.error(error);
  }
}
