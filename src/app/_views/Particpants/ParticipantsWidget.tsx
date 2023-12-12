"use client";
import Image from "next/image";
import getStatusColor from "@/app/_utils/helpers/getStatus";
import { ExtendedRoom } from "@/app/_models/room";

interface ParticipantsProps {
  room: ExtendedRoom;
}

function Participants(props: ParticipantsProps) {
  console.log("party", props.room.participants);
  const { participants } = props.room;

  console.log("party", participants);

  return (
    <>
      <h3 className="text-h3 font-medium">Participants</h3>
      <p className="text-mini text-grey">{participants.length} participants</p>
      <div className="flex flex-wrap">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="relative p-2 flex flex-col border border-primary overflow-hidden"
          >
            <div className="h-full relative">
              <div className="rounded-full border border-grey relative min-w-[3rem] min-h-[3rem] overflow-hidden">
                <Image
                  src={
                    participant.user?.avatar
                      ? participant.user.avatar.formatted_url
                      : "/default_avatar.png"
                  }
                  alt={`${participant.user?.first_name}'s avatar picture`}
                  style={{ objectFit: "cover" }}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (min-width: 769px) 33vw"
                  className="filter group-hover:brightness-90 transition"
                />
              </div>
              <div
                className={`absolute bottom-0.5 right-0.5 z-[9999] rounded-full w-3 h-3   
                    ${getStatusColor(participant.user?.status.title)}`}
              />
            </div>
            <div>
              <p className="text-mini text-grey mt-3 text-center">
                {participant.user.first_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Participants;