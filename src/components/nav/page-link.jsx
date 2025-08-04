"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PageLink = ({ href, className, children, ...props }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className={cn(
        "aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PageLink;
