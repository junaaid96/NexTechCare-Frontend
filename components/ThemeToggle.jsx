"use client";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const toggle = () => {
        const dark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("ntc_theme", dark ? "dark" : "light");
    };
    return (
        <button onClick={toggle} aria-label="Toggle theme" className="grid size-9 place-items-center rounded-xl text-muted transition hover:bg-surface-2 hover:text-fg cursor-pointer">
            <Sun className="hidden size-4 dark:block" />
            <Moon className="size-4 dark:hidden" />
        </button>
    );
}
