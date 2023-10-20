import { User } from "next-auth";
import { Room } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";

interface Roomprops {
  room: Room;
  sessionUser: User;
}

function RoomView(props: Roomprops) {
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>content here</div>
    </div>
  );
}

export default RoomView;
