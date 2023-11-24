"use client";
import CreateRoomForm from "@/app/_components/forms/CreateRoomForm";
import Modal from "@/app/_components/modals/Modal";
import { useState } from "react";

function RoomCreateModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-full flex items-center gap-2 text-bg_black px-2 py-1.5"
      >
        <svg
          className="w-3.5"
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2143 0H13.3571C13.5476 0 13.6429 0.0952381 13.6429 0.285714V25.4286C13.6429 25.619 13.5476 25.7143 13.3571 25.7143H11.2143C11.0238 25.7143 10.9286 25.619 10.9286 25.4286V0.285714C10.9286 0.0952381 11.0238 0 11.2143 0Z"
            fill="#0F0F0F"
          />
          <path
            d="M0.285714 11.5H24.2857C24.4762 11.5 24.5714 11.5952 24.5714 11.7857V13.9286C24.5714 14.119 24.4762 14.2143 24.2857 14.2143H0.285714C0.0952381 14.2143 0 14.119 0 13.9286V11.7857C0 11.5952 0.0952381 11.5 0.285714 11.5Z"
            fill="#0F0F0F"
          />
        </svg>
        <span className="pr-1">Create new room</span>
      </button>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <CreateRoomForm />
        </Modal>
      )}
    </>
  );
}

export default RoomCreateModal;
