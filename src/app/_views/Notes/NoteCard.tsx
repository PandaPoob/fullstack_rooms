"use client";
import { NoteWidget } from "@prisma/client";
import { NoteItem } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

// interface Notes {
//   id: string;
//   room_fk: string;
//   updated_at: Date;
//   noteItem: NoteItem[];
// }

interface NoteCardProps {
  id: string;
  title: string;
  text: string;
  onDelete: (id: string) => void; // Function to handle delete action
}

function NoteCard(props: NoteCardProps) {
  const handleDelete = () => {
    props.onDelete(props.id);
  };
  return (
    <article className="w-full md:w-68 md:h-36 bg-primary rounded-lg p-2">
      <div className="flex justify-between items-center mt-2 mb-4">
        <p className="text-xs text-secondary ">March 25th, 2023</p>
        <div className="">
          <button onClick={handleDelete} className="text-xs mr-2">
            Delete
          </button>
          <button className="text-xs">Edit</button>
        </div>
      </div>
      <div>
        <h2 className="mt-2 text-xl font-bold text-white">{props.title}</h2>
        <p className="text-white opacity-80 text-sm mt-2">{props.text}</p>
      </div>
    </article>
  );
}
export default NoteCard;

// function NoteCard(props: NoteItem) {

//   return (
//     <article className="w-full md:w-68 md:h-36 bg-primary rounded-lg p-2">
//       <div className="flex justify-between items-center mt-2 mb-4">
//         <p className="text-xs text-secondary ">March 25th, 2023</p>
//         <div className="">
//           <button className="text-xs mr-2">Delete</button>
//           <button className="text-xs">Edit</button>
//         </div>
//       </div>
//       <div>
//         <h2 className="mt-2 text-xl font-bold text-white">{props.title}</h2>
//         <p className="text-white opacity-80 text-sm mt-2">{props.text}</p>
//       </div>
//     </article>
//   );
// }
// export default NoteCard;
