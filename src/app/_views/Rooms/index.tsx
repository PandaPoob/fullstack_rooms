import RoomsList from "./RoomsList";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import { User } from "next-auth";

interface RoomsProps {
  sessionUser: User;
}

function Rooms(props: RoomsProps) {
  const { sessionUser } = props;

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

        <RoomsList />
      </div>
    </div>
  );
}

export default Rooms;
