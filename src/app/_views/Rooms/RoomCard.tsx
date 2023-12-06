import { ExtendedRoom } from "@/app/_models/room";
import Image from "next/image";
import Link from "next/link";

function RoomCard({ title, cover, id }: ExtendedRoom) {
  return (
    <Link href={`/rooms/${id}`} className="group">
      <article className="text-center grid gap-1">
        <div className="relative w-full h-auto min-h-[12.5rem] min-w-[18rem] sm:min-w-[21.5rem] rounded-lg overflow-hidden ">
          <Image
            src={cover ? cover.formatted_url : "/default_cover.png"}
            alt={title}
            style={{ objectFit: "cover" }}
            fill={true}
            className="filter group-hover:brightness-90 transition"
          />
        </div>
        <h3>{title}</h3>
      </article>
    </Link>
  );
}

export default RoomCard;
