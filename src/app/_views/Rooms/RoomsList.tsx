import { Room } from "@prisma/client";

function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <div>
      {rooms.map((room: Room) => {
        return <p key={room.id}>{room.title}</p>;
      })}
    </div>
  );
}

export default RoomsList;
