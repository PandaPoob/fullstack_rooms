import { Room } from "@prisma/client";
import RoomsList from "./RoomsList";

interface RoomsProps {
  data: { userRooms: Room[] };
}

function Rooms(props: RoomsProps) {
  return (
    <div>
      <h1>Your Rooms</h1>
      <RoomsList rooms={props.data.userRooms} />
    </div>
  );
}

export default Rooms;
