"use client";
import CreateRoomForm from "@/app/_components/forms/CreateRoomForm";
import Modal from "@/app/_components/modals/Modal";
import { useState } from "react";

function RoomCreateModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="primary-btn">
        <span>Create new room</span>
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
