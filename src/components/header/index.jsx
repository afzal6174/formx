"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "../theme/theme-toggle-button";
import Logo from "./logo";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-card text-card-foreground sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu />
          </Button>
          <Logo />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
