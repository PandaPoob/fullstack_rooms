import { User } from "next-auth";
import { NoteItem, Room, TaskItem } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";
import NoteCard from "../Notes/NoteCard";
import TaskWidget from "@/app/_components/TaskWidget";
import TaskModal from "@/app/_components/TaskModal";

interface Roomprops {
  room: Room;
  sessionUser: User;
  modalParams: { modal: string } | undefined | null;
  taskWidgetId: string;
  tasks?: TaskItem[];
  noteItem?: NoteItem;
}

async function RoomView(props: Roomprops) {
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <div className="flex justify-between">
        <DigitalClock title={`Welcome, ${props.room.title}`} />
        {props.room.admin_fk === props.sessionUser.id && (
          <Link
            className="self-start mt-7 hover:bg-white hover:bg-opacity-10 p-2 rounded-md"
            href={`/rooms/${props.room.id}/settings`}
          >
            <svg
              className="w-5 h-5"
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.815 15.372C23.8705 14.924 23.9121 14.476 23.9121 14C23.9121 13.524 23.8705 13.076 23.815 12.628L26.7434 10.318C27.0071 10.108 27.0765 9.73004 26.9099 9.42204L24.1342 4.57805C24.0523 4.43361 23.9222 4.32328 23.7671 4.26684C23.6119 4.2104 23.4419 4.21154 23.2876 4.27006L19.8318 5.67005C19.1101 5.11005 18.3329 4.64805 17.4863 4.29806L16.9589 0.588064C16.9359 0.423342 16.8542 0.27273 16.729 0.164475C16.6037 0.0562213 16.4437 -0.00223682 16.2788 6.55043e-05H10.7273C10.3804 6.55043e-05 10.0889 0.252065 10.0473 0.588064L9.51987 4.29806C8.67327 4.64805 7.89606 5.12405 7.17437 5.67005L3.71857 4.27006C3.6381 4.24252 3.55373 4.22833 3.46875 4.22806C3.23281 4.22806 2.99688 4.35405 2.87197 4.57805L0.0962233 9.42204C-0.0842 9.73004 -0.000927518 10.108 0.262768 10.318L3.19118 12.628C3.13566 13.076 3.09403 13.538 3.09403 14C3.09403 14.462 3.13566 14.924 3.19118 15.372L0.262768 17.682C-0.000927518 17.892 -0.0703213 18.27 0.0962233 18.578L2.87197 23.422C2.95378 23.5665 3.08392 23.6768 3.23906 23.7332C3.3942 23.7897 3.56419 23.7885 3.71857 23.73L7.17437 22.33C7.89606 22.89 8.67327 23.352 9.51987 23.702L10.0473 27.412C10.0889 27.748 10.3804 28 10.7273 28H16.2788C16.6258 28 16.9172 27.748 16.9589 27.412L17.4863 23.702C18.3329 23.352 19.1101 22.876 19.8318 22.33L23.2876 23.73C23.3708 23.758 23.4541 23.772 23.5374 23.772C23.7733 23.772 24.0093 23.646 24.1342 23.422L26.9099 18.578C27.0765 18.27 27.0071 17.892 26.7434 17.682L23.815 15.372ZM21.067 12.978C21.1225 13.412 21.1364 13.706 21.1364 14C21.1364 14.294 21.1086 14.602 21.067 15.022L20.8727 16.604L22.1079 17.584L23.6068 18.76L22.6353 20.454L20.8727 19.74L19.4293 19.152L18.1802 20.104C17.5834 20.552 17.0144 20.888 16.4454 21.126L14.9742 21.728L14.7521 23.31L14.4746 25.2H12.5316L12.2679 23.31L12.0458 21.728L10.5747 21.126C9.97787 20.874 9.42272 20.552 8.86757 20.132L7.60461 19.152L6.13347 19.754L4.37087 20.468L3.39936 18.774L4.89826 17.598L6.13347 16.618L5.93916 15.036C5.89753 14.602 5.86977 14.28 5.86977 14C5.86977 13.72 5.89753 13.398 5.93916 12.978L6.13347 11.396L4.89826 10.416L3.39936 9.24004L4.37087 7.54605L6.13347 8.26005L7.57685 8.84804L8.82594 7.89605C9.42272 7.44805 9.99175 7.11205 10.5608 6.87405L12.0319 6.27205L12.254 4.69005L12.5316 2.80006H14.4607L14.7244 4.69005L14.9465 6.27205L16.4176 6.87405C17.0144 7.12605 17.5695 7.44805 18.1247 7.86805L19.3876 8.84804L20.8588 8.24605L22.6214 7.53205L23.5929 9.22604L22.1079 10.416L20.8727 11.396L21.067 12.978ZM13.5031 8.40005C10.4359 8.40005 7.95158 10.906 7.95158 14C7.95158 17.094 10.4359 19.6 13.5031 19.6C16.5703 19.6 19.0546 17.094 19.0546 14C19.0546 10.906 16.5703 8.40005 13.5031 8.40005ZM13.5031 16.8C11.9764 16.8 10.7273 15.54 10.7273 14C10.7273 12.46 11.9764 11.2 13.5031 11.2C15.0297 11.2 16.2788 12.46 16.2788 14C16.2788 15.54 15.0297 16.8 13.5031 16.8Z"
                fill="#9A9A9A"
              />
            </svg>
          </Link>
        )}
      </div>
      <div>Dashboard content here</div>
      <section className="grid grid-cols-4 gap-4">
        <div>
          <Link href={`/rooms/${props.room.id}/notes`}>
            {props.noteItem ? (
              <NoteCard
                title={props.noteItem.title}
                text={props.noteItem.text}
                date={props.noteItem.created_at}
              />
            ) : (
              <p className="">No notes yet</p>
            )}
          </Link>
        </div>
        <div>
          <Link href={`/rooms/${props.room.id}/?modal=true`}>
            <>
              <div className="bg-primary rounded-xl py-6 pl-6 my-2 h-[250px] flex-row">
                <TaskWidget
                  tasks={props.tasks}
                  room={props.room}
                  taskWidgetId={props.taskWidgetId}
                  modalParams={props.modalParams}
                />
              </div>
            </>
          </Link>

          {props.modalParams?.modal && (
            <TaskModal
              tasks={props.tasks}
              room={props.room}
              taskWidgetId={props.taskWidgetId}
              modalParams={props.modalParams}
            />
          )}
        </div>
        <div>widget 3</div>
        <div>widget 4</div>
      </section>
    </div>
  );
}

export default RoomView;
