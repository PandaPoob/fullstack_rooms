import { requireAuthentication } from "@/app/_middleware/authentication";
import Rooms from "@/app/_views/Rooms";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { Room } from "@prisma/client";
import { Session } from "next-auth";

async function getData(props: Session) {
  try {
    //fetch rooms
    const rooms = await db.room.findMany({
      where: {
        participants: {
          some: {
            user_id: props.user.id as string,
          },
        },
      },
      select: {
        id: true,
        title: true,
        created_at: true,
        updated_at: true,
        admin_fk: true,
        location: true,
        cover_img: true,
        participants: {
          select: {
            visited_at: true,
            user_id: true,
          },
        },
      },
    });

    const sortedRooms = rooms.slice().sort((a, b) => {
      const participantA = a.participants.find(
        (participant) => participant.user_id === props.user.id
      );

      const participantB = b.participants.find(
        (participant) => participant.user_id === props.user.id
      );

      const visitedAtA = participantA?.visited_at
        ? new Date(participantA.visited_at)
        : null;
      const visitedAtB = participantB?.visited_at
        ? new Date(participantB.visited_at)
        : null;

      if (visitedAtA && visitedAtB) {
        return visitedAtB.getTime() - visitedAtA.getTime();
      } else if (visitedAtA) {
        return -1;
      } else if (visitedAtB) {
        return 1;
      } else {
        return 0;
      }
    });
    return {
      userRooms: sortedRooms as Room[],
    };
  } catch (error) {
    console.error("An error occurred fetching rooms", error);
  }
}

async function RoomsPage() {
  //Validate and getSession
  const session = await requireAuthentication(authOptions);
  const data = await getData(session);
  //console.log(data?.userRooms);

  return data && <Rooms data={data} sessionUser={session.user} />;
}

export default RoomsPage;
