"use client";

interface ModalProps {
  children: JSX.Element;
  setIsOpen: (isOpen: boolean) => void;
}

function Modal(props: ModalProps) {
  return (
    <div className="absolute top-0 right-0 w-screen h-screen bg-bg_black bg-opacity-10 z-40 flex justify-center md:py-24">
      <div className="relative z-50 bg-bg_black rounded-xl w-full h-full md:max-w-5xl p-8 grid border border-primary">
        <button
          className="absolute top-6 right-6 z-50"
          onClick={() => props.setIsOpen(false)}
        >
          <svg
            className="w-5 rotate-45"
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2143 0H13.3571C13.5476 0 13.6429 0.0952381 13.6429 0.285714V25.4286C13.6429 25.619 13.5476 25.7143 13.3571 25.7143H11.2143C11.0238 25.7143 10.9286 25.619 10.9286 25.4286V0.285714C10.9286 0.0952381 11.0238 0 11.2143 0Z"
              fill="white"
            />
            <path
              d="M0.285714 11.5H24.2857C24.4762 11.5 24.5714 11.5952 24.5714 11.7857V13.9286C24.5714 14.119 24.4762 14.2143 24.2857 14.2143H0.285714C0.0952381 14.2143 0 14.119 0 13.9286V11.7857C0 11.5952 0.0952381 11.5 0.285714 11.5Z"
              fill="white"
            />
          </svg>
        </button>
        <div className="mt-8">{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;