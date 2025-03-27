import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white w-full md:w-64 h-12 md:h-screen fixed md:fixed bottom-0 md:bottom-0 md:top-0 left-0 z-40 flex md:flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden absolute left-4 top-1/2 transform -translate-y-1/2"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div className="md:hidden flex-1 flex items-center justify-center text-sm font-medium">
        Details
      </div>

      <div
        className={`
        ${isOpen ? "fixed inset-0 bg-gray-800 pt-12" : "hidden"}
        md:block md:relative md:bg-transparent md:pt-0
      `}
      >
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute right-4 top-4 text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <div className="p-4 md:p-6 h-full">
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center px-4 py-2  rounded-md "
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span>Details</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
