import { ReactNode } from "react";
import { Room, TaskItem } from "@prisma/client";

interface ServerModalProps {
  tasks?: TaskItem[];
  room: Room;
  taskWidgetId: string;
  modalParams: { modal: string } | undefined | null;
  children?: ReactNode;
}

export default function ServerModal({
  tasks,
  room,
  taskWidgetId,
  modalParams,
  children,
}: ServerModalProps) {
  // ... (your existing modal code)

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto "
      id="error-modal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* span for top spacing */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          style={{ height: "65vh" }}
          className="h-full inline-block align-bottom bg-bg_black border border-secondary rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div className="h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
