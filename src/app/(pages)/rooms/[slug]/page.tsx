import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { redirect } from "next/navigation";
import RoomView from "@/app/_views/Room";

async function getData(params: { slug: string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  if (!params.slug) {
    redirect("/error");
  } else {
    const room = await db.room.findUnique({
      where: {
        id: params.slug as string,
        participants: {
          some: {
            user_id: session.user.id as string,
          },
        },
      },
    });
    if (!room) {
      redirect("/error");
    }
    const data = {
      room,
      session,
    };
    return data;
  }
}

async function RoomPage(props: { params: { slug: string } }) {
  const data = await getData(props.params);

  return data && <RoomView room={data.room} sessionUser={data.session.user} />;
}

export default RoomPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  return {
    props: {
      params,
    },
  };
};
