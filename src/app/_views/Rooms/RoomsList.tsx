import { Room } from "@prisma/client";
import RoomCard from "./RoomCard";

function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <div className="py-7 flex flex-col gap-5 justify-center items-center md:flex-wrap md:flex-row">
      {rooms.map((room: Room) => {
        return <RoomCard key={room.id} {...room} />;
      })}
    </div>
  );
}

export default RoomsList;
