"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-300 sticky bg-white">
      <div className="font-bold text-lg">Just an empty Dash 🤷🏻‍♂️</div>

      <div className="relative" ref={menuRef}>
        <img
          onClick={toggleMenu}
          src="/profile-img.jpeg"
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />

        {menuOpen && (
          <div className="absolute right-0 top-12 bg-white shadow-md rounded overflow-hidden z-50">
            <div className="p-2 cursor-pointer border-b border-gray-200">
              <button
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => {
                  alert("Honestly, this button doesn't really do anything.");
                }}
              >
                Useless button
              </button>
            </div>
            <div className="p-2">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
                onClick={() => {
                  toggleMenu();
                  signOut();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
