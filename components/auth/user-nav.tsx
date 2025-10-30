"use client";

import { useState, useRef, useEffect } from "react";
import { User, ChevronDown } from "lucide-react";
import { LogoutButton } from "./logout-button";
import { cn } from "@/lib/utils";

interface UserNavProps {
  userEmail: string;
}

export function UserNav({ userEmail }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{userEmail}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
          role="menu"
        >
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Signed in as
            </p>
            <p className="mt-1 truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {userEmail}
            </p>
          </div>
          <div className="p-2">
            <LogoutButton variant="ghost" className="w-full justify-start" />
          </div>
        </div>
      )}
    </div>
  );
}

