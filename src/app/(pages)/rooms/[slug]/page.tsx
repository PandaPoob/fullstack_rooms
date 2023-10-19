import { requireAuthentication } from "@/app/_middleware/authentication";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { Session, getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { redirect } from "next/navigation";

async function RoomPage(props: any) {
  console.log("PROPS", props);
  return <div>Room here</div>;
  //data && <Rooms data={data} sessionUser={props.user} />;
}
export default RoomPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  console.log("CONTEXT", context);
  const { params } = context;

  // const slug = params!.slug;
  const room = await db.room.findUnique({
    where: {
      id: params!.slug as string,
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

  const data = "ASGFSDFD";
  return {
    props: {
      data,
      room: room,
    },
  };
};
