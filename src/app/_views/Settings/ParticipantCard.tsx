import { ExtendedRoom } from "@/app/_models/room";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

interface ParticipantCardProps {
  user?: User;
  room: ExtendedRoom;
}

function ParticipantCard(props: ParticipantCardProps) {
  const { data: session } = useSession();

  const { user } = props;
  return (
    <li className="flex justify-between items-center py-3 border-b border-grey border-opacity-30">
      <div className="grid">
        <span>
          {user?.first_name} {user?.last_name}
          {session?.user.id === user?.id && (
            <span className=" text-secondary"> (you)</span>
          )}
        </span>
        <span className="text-xs text-secondary">{user?.email}</span>
      </div>
      <div>
        {props.room.admin_fk === user?.id ? (
          <span>Owner</span>
        ) : (
          <button className="bg-btn-gradient text-xs py-2 px-6 mx-auto rounded-3xl flex items-center justify-center">
            Kick
          </button>
        )}
      </div>
    </li>
  );
}

export default ParticipantCard;
