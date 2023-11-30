import { NoteWidget } from "@prisma/client";
import { NoteItem } from "@prisma/client";
import Link from "next/link";

interface Notes {
  id: string;
  room_fk: string;
  updated_at: Date;
  noteItem: NoteItem[];
}

function NoteCard(props: NoteItem) {
  // console.log("props", props);
  // Wrap article in link

  return (
    <article className="w-full md:w-68 md:h-36 bg-primary rounded-lg p-2">
      <div className="flex justify-between">
        <p className="text-xs mt-2 text-secondary ">March 25th, 2023</p>
        <Link href={"/"}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
            className="text-secondary justify-end"
          >
            <path
              fill="currentColor"
              d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
            />
          </svg>
        </Link>
      </div>
      <div>
        <h2 className="mt-2 text-xl font-bold text-white">{props.title}</h2>
        <p className="text-white opacity-80 text-sm mt-2">{props.text}</p>
      </div>
    </article>
  );
}

export default NoteCard;
