"use client";
import { ExtendedRoom } from "@/app/_models/room";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Weather from "./Weather";

interface WeatherWidgetProps {
  roomData: ExtendedRoom;
  weatherData?: any;
}

function WeatherWidget({ roomData, weatherData }: WeatherWidgetProps) {
  const { data: session } = useSession();

  return (
    <div className="bg-primary rounded-xl">
      {roomData.location ? (
        <Weather weatherData={weatherData} locationData={roomData.location} />
      ) : (
        <div className="p-6">
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
