"use client";
import { ExtendedRoom } from "@/app/_models/room";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface WeatherWidgetProps {
  roomData: ExtendedRoom;
}

function WeatherWidget({ roomData }: WeatherWidgetProps) {
  console.log(roomData);
  const { data: session } = useSession();

  return (
    <div className="bg-primary rounded-xl p-6">
      {roomData.location ? (
        <div>data here</div>
      ) : (
        <div>
          <span>No weather data</span>
          {roomData.admin_fk === session?.user.id && (
            <>
              <span> , add location </span>
              <Link
                className="hover:font-medium transition"
                href={`
            settings?tab=3`}
              >
                here
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
