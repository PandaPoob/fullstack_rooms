import { Room } from "@prisma/client";
import Image from "next/image";

function RoomCard({ title, cover_img, id }: Room) {
  return (
    <a href={`/rooms/${id}`} className="group">
      <article className="text-center grid gap-1">
        <div className="relative w-full h-auto min-h-[12.5rem] min-w-[18rem] sm:min-w-[21.5rem] rounded-lg overflow-hidden ">
          <Image
            src={cover_img}
            alt={title}
            style={{ objectFit: "cover" }}
            fill={true}
            className="filter group-hover:brightness-90 transition"
          />
        </div>
        <h3>{title}</h3>
      </article>
    </a>
  );
}

export default RoomCard;
