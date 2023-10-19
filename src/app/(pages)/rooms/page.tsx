import { requireAuthentication } from "@/app/_middleware/authentication";
import Rooms from "@/app/_views/Rooms";
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
          },
        },
      },
    });

    const sorted_rooms = rooms.sort((a, b) => {
      const visitedAtA = a.participants?.[0]?.visited_at;
      const visitedAtB = b.participants?.[0]?.visited_at;

      if (visitedAtA && visitedAtB) {
        return new Date(visitedAtB).getTime() - new Date(visitedAtA).getTime();
      } else {
        return 0; // Handle cases where visited_at is missing
      }
    });
    return {
      userRooms: sorted_rooms as Room[],
    };
  } catch (error) {
    console.error("An error occurred fetching rooms", error);
  }
}

async function RoomsPage(props: Session) {
  const data = await getData(props);

  return data && <Rooms data={data} sessionUser={props.user} />;
}

export default requireAuthentication(RoomsPage);
