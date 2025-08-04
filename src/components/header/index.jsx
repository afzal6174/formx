import { Menu } from "lucide-react";

import SidebarToggleButton from "../nav/sidebar-toggle-button";
import { ThemeToggle } from "../theme/theme-toggle-button";
import Logo from "./logo";

export function SiteHeader() {
  return (
    <header className="bg-card text-card-foreground sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <SidebarToggleButton variant="ghost" size="icon">
            <Menu />
          </SidebarToggleButton>
          <Logo />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
