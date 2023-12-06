import EditRoomParticipantsRoom from "@/app/_components/forms/EditRoomParticipantsForm";
import { ExtendedRoom } from "@/app/_models/room";
import ParticipantCard from "./ParticipantCard";
import { ExtendedParticipant } from "@/app/_models/participant";

interface RoomSettingsMembersProps {
  room: ExtendedRoom;
  setRoom: (room: ExtendedRoom) => void;
  participants?: ExtendedParticipant[];
}

function RoomSettingsMembers(props: RoomSettingsMembersProps) {
  return (
    <div>
      <div className="mb-12">
        <h2 className="text-h3 font-medium mb-5">Members</h2>

        <ul className="flex flex-col border-t border-grey border-opacity-30">
          {props.participants?.map((p) => (
            <ParticipantCard key={p.id} {...p} room={props.room} />
          ))}
        </ul>
      </div>
      <EditRoomParticipantsRoom
        room={props.room}
        setRoom={props.setRoom}
        participants={props.participants}
      />
    </div>
  );
}

export default RoomSettingsMembers;
