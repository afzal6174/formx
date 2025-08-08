"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export default function SidebarProviderClient({ children, ...props }) {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar_state="));
    if (cookie?.split("=")[1] === "false") {
      setOpen(false);
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} {...props}>
      {children}
    </SidebarProvider>
  );
}
