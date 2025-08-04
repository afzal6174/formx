"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import React from "react";
import { useSidebar } from "../ui/sidebar";

const SidebarToggleButton = ({ className, children, ...props }) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      className={cn("h-8 w-8", className)}
      onClick={toggleSidebar}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SidebarToggleButton;
