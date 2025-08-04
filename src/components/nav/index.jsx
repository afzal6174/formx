import { Calendar, Check, Home, Menu, TextCursorInput } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "../header/logo";
import PageLink from "./page-link";
import SidebarToggleButton from "./sidebar-toggle-button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Input",
    url: "/input",
    icon: TextCursorInput,
  },
  {
    title: "Select",
    url: "/select",
    icon: Check,
  },
  {
    title: "Date Picker",
    url: "/date-picker",
    icon: Calendar,
  },
];

export default function MainNav(props) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader className="md:hidden">
        <div className="flex items-center gap-2">
          <SidebarToggleButton variant="ghost" size="icon">
            <Menu />
          </SidebarToggleButton>
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Form Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <PageLink href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </PageLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
