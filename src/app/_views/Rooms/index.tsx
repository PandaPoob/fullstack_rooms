import { Room } from "@prisma/client";
import RoomsList from "./RoomsList";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import { User } from "next-auth";

interface RoomsProps {
  data: { userRooms: Room[] };
  sessionUser: User;
}

function Rooms(props: RoomsProps) {
  const { data, sessionUser } = props;

  return (
    <div>
      <DigitalClock
        title={`Welcome, ${
          sessionUser.first_name + " " + sessionUser.last_name
        }`}
      />
      <div>
        <h1 className="text-h2 font-medium text-center md:text-h2">
          {sessionUser.first_name + " " + sessionUser.last_name}, Pick your
          dashboard
        </h1>

        <RoomsList rooms={data.userRooms} />
      </div>
    </div>
  );
}

export default Rooms;
