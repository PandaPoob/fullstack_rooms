"use client";
import { Room } from "@prisma/client";
import RoomCard from "./RoomCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function getRooms() {
      const resp = await fetch(`/api/rooms/${session!.user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session!.token.sub}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setRooms(data.data);
      } else {
        console.log("Error fetching rooms");
      }
    }
    if (session) {
      getRooms();
    }
  }, [session]);

  return (
    <div className="py-7 flex flex-col gap-5 justify-center items-center md:flex-wrap md:flex-row">
      {rooms.length !== 0 &&
        rooms.map((room: Room) => {
          return <RoomCard key={room.id} {...room} />;
        })}
    </div>
  );
}

export default RoomsList;
