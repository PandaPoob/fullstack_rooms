import LocationForm from "@/app/_components/forms/LocationForm";
import SearchCitiesForm from "@/app/_components/forms/SearchCitiesForm";
import { City } from "@/app/_models/location";
import { ExtendedRoom } from "@/app/_models/room";
import { useState } from "react";

interface RoomSettingsLocationProps {
  room: ExtendedRoom;
}

function RoomSettingsLocation({ room }: RoomSettingsLocationProps) {
  //if it has location
  const [cityResult, setCityResult] = useState<City[]>([]);
  return (
    <div>
      <h2 className="text-h3 font-medium hidden md:block mb-2">
        Weather location
      </h2>
      <div>
        {room.location ? (
          <>there is location</>
        ) : (
          <p className="text-darkGrey">
            No location added, add a location down below
          </p>
        )}
      </div>
      <div className="mt-12">
        <h2 className="text-h3 font-medium mb-1">Search for cities</h2>
        <p className="mb-4 text-darkGrey">
          Here you can search for a weather location by looking up cities
        </p>

        <SearchCitiesForm setCityResult={setCityResult} />
        <div>
          {cityResult.length !== 0 && (
            <div>
              <p className="text-right mb-2 text-sm">
                Results: {cityResult.length}
              </p>
              <ul className="border-t border-grey">
                {cityResult.map((city) => (
                  <LocationForm
                    key={city.id}
                    city={city}
                    hasLocation={room.location ? true : false}
                    setCityResult={setCityResult}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomSettingsLocation;
