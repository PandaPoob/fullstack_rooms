"use client";
import SettingsBanner from "@/app/_components/misc/SettingsBanner";
import { ExtendedRoom } from "@/app/_models/room";
import { Room } from "@prisma/client";
import RoomSettingsMenu from "./RoomSettingsMenu";
import { useState } from "react";

interface SettingsProps {
  roomData: ExtendedRoom;
}

function Settings({ roomData }: SettingsProps) {
  const [tab, setTab] = useState(1);

  return (
    <main>
      <h2 className="text-h2 mb-7 md:mt-7">Room settings</h2>
      <div className="lg:flex lg:gap-2">
        <div className="bg-dark rounded-xl lg:w-[30%] xl:w-1/4 xxl:w-1/5 lg:min-h-[calc(100vh-7.5rem)] flex flex-col">
          <SettingsBanner
            img={
              roomData.cover?.id
                ? roomData.cover.formatted_url
                : "/default_cover.png"
            }
            nameTitle={roomData.title}
          />

          <div className="lg:hidden">
            <RoomSettingsMenu tab={tab} setTab={setTab} />
          </div>

          <div className="hidden lg:block lg:min-h-[calc(100%-7rem)]">
            <ul className="h-full flex flex-col">
              <li>
                <button
                  onClick={() => setTab(1)}
                  className={`px-6 py-3 w-full border-y border-darkGrey border-opacity-30 transition hover:bg-opacity-30 hover:bg-bg_black ${
                    tab === 1
                      ? "text-white font-medium"
                      : "text-darkGrey font-normal"
                  }`}
                >
                  Edit Room
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTab(2)}
                  className={`px-6 py-3 w-full border-b border-darkGrey border-opacity-30 font-medium transition hover:bg-opacity-30 hover:bg-bg_black ${
                    tab === 2
                      ? "text-white font-medium"
                      : "text-darkGrey font-normal"
                  }`}
                >
                  Members
                </button>
              </li>

              <li className="mt-auto">Delete room</li>
            </ul>
          </div>
        </div>

        <div className="hidden lg:block lg:w-[70%] xl:w-3/4 xxl:w-4/5 bg-dark rounded-xl p-7 xxl:px-14">
          {tab === 1 ? <div>Edit room here</div> : <div>Edit members here</div>}

          {/*          <EditUserForm
            profile={props.profile}
            statusOptions={props.statusOptions}
          /> */}
        </div>
      </div>
    </main>
  );
}

export default Settings;
