"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Promeni svetlu / tamnu temu"
      title="Svetla / tamna tema"
      className="relative grid size-10 place-items-center rounded-full border border-line text-fg-soft transition hover:border-gold hover:text-gold"
    >
      <Sun className="size-4 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
