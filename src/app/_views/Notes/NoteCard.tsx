"use client";
import { formatDate } from "@/app/_utils/helpers/date";

interface NoteCardProps {
  title: string;
  text: string;
  date: Date;
}

function NoteCard(props: NoteCardProps) {
  const newDate = formatDate(props.date);

  return (
    <article className="bg-primary rounded-xl p-6  md:h-[180px] flex-row ">
      <div className="flex justify-between items-center mt-2 mb-4">
        <p className="text-xs text-secondary">{newDate}</p>
      </div>
      <div>
        <h2 className="mt-2 text-xl font-bold text-white">{props.title}</h2>
        <p className="text-white opacity-80 text-sm mt-2">{props.text}</p>
      </div>
    </article>
  );
}
export default NoteCard;
