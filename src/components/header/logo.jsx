import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="font-bold text-3xl">
      <Link href="/">
        Form
        <span className="text-accent-foreground">X</span>
      </Link>
    </div>
  );
};

export default Logo;
