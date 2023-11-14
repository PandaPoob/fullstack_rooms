import { NoteWidget } from "@prisma/client";
import { NoteItem } from "@prisma/client";

function NoteCard({ title, text, created_at, id }: NoteItem) {
// Wrap article in link 

  return (
    <article className="h-42 w-60 bg-primary rounded-lg p-2">
      <div className="flex justify-between">
        <p className="text-xs mt-[1rem] text-white ">March 25, 2023</p>
        <button className="text-xs text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m13.692 17.308l-.707-.72l4.088-4.088H5v-1h12.073l-4.088-4.088l.707-.72L19 12l-5.308 5.308Z"
            />
          </svg>
        </button>
      </div>
      <div>
        <h2 className="mt-4 text-xl font-bold text-white">{title}</h2>
        <p className="text-secondary text-sm mt-2">{text}</p>
      </div>
      <div className="h-[0.1rem] w-54 bg-secondary mt-8 mb-2 rounded-lg"></div>
    </article>
  );
}

export default NoteCard;
