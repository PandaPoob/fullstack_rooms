"use client";
import EditRoomForm from "@/app/_components/forms/EditRoomForm";
import { ExtendedRoom } from "@/app/_models/room";
import { useState } from "react";

interface RoomSettingsMenuProps {
  tab: number;
  setTab: (tab: number) => void;
  room: ExtendedRoom;
  setRoom: (room: ExtendedRoom) => void;
}

function RoomSettingsMenu(props: RoomSettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ul>
        <li>
          <button
            onClick={() => {
              props.setTab(1);
              setIsOpen(true);
            }}
            className="px-6 py-3 w-full border-y border-darkGrey border-opacity-30 font-medium transition hover:bg-opacity-30 hover:bg-bg_black"
          >
            Edit room
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.setTab(2);
              setIsOpen(true);
            }}
            className="px-6 py-3 w-full border-y border-darkGrey border-opacity-30 font-medium transition hover:bg-opacity-30 hover:bg-bg_black"
          >
            Edit Members
          </button>
        </li>

        <li>Delete room</li>
      </ul>
      {isOpen && (
        <div className="absolute top-0 left-0 h-0 min-h-screen z-10 bg-bg_black w-full px-6 md:w-[calc(100%-7.5rem)] md:ml-[7.5rem]">
          {props.tab === 1 ? (
            <div className="grid">
              <div className="flex gap-2 text-h4 mt-4">
                <button onClick={() => setIsOpen(false)}>Settings</button>
                <span>/</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-medium"
                >
                  Edit Room
                </button>
              </div>
              <EditRoomForm room={props.room} setRoom={props.setRoom} />
            </div>
          ) : (
            <>
              <div className="flex gap-2 text-h4 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-medium"
                >
                  Settings
                </button>
                <button onClick={() => setIsOpen(false)}>Edit Room</button>
              </div>
            </>
          )}

          {/*           <div className="flex gap-2 text-h4 mt-4">
            <button onClick={() => setIsOpen(false)}>Settings</button>
            <span>/</span>
            <button className="font-medium">Edit profile</button>
          </div>
          <EditUserForm
            profile={props.profile}
            statusOptions={props.statusOptions}
          /> */}
        </div>
      )}
    </div>
  );
}

export default RoomSettingsMenu;
