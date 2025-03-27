import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, deleteAccount } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md p-2 xs:p-3 sm:p-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <img
          className="w-[70px] xs:w-[80px] sm:w-[100px] md:w-[120px] transition-all duration-200"
          src="https://algorootglobal.com/assets/algoroot_logo-BvclIMjb.png"
          alt="Logo"
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-1 sm:space-x-2 focus:outline-none"
          aria-expanded={dropdownOpen}
          aria-label="User menu"
        >
          <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <svg
            className={`hidden xs:block w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          className={`mt-2 w-40 xs:w-48 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-200 ease-in-out ${
            dropdownOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
          style={{
            position: "absolute",
            right: 0,
            zIndex: 50,
            transformOrigin: "top right",
          }}
        >
          <div className="px-3 xs:px-4 py-2 xs:py-3 border-b border-gray-100">
            <p className="text-xs xs:text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-[10px] xs:text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
          <div className="py-1">
            <button
              onClick={logout}
              className="w-full text-left font-medium xs:font-semibold px-3 xs:px-4 py-1 xs:py-2 text-xs xs:text-sm text-gray-700 hover:text-white hover:bg-zinc-700 hover:rounded-sm cursor-pointer transition-colors"
            >
              Logout
            </button>
            <button
              onClick={deleteAccount}
              className="block w-full text-left font-medium xs:font-semibold px-3 xs:px-4 py-1 xs:py-2 text-xs xs:text-sm text-red-600 hover:bg-red-600 hover:text-white hover:rounded-sm cursor-pointer transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
