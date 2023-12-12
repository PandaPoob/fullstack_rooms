import { ReactNode } from "react";
import { Room, TaskItem } from "@prisma/client";

interface ServerModalProps {
  children?: ReactNode;
}

export default function ServerModal({ children }: ServerModalProps) {
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
          className="h-full inline-block align-bottom bg-bg_black border border-grey rounded-lg pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full "
        >
          <div className="h-full relative px-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
