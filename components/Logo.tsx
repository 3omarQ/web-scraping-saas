import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo({
  fontSize = "text-2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link href="/">
      <Image
        className="h-auto w-auto max-w-full"
        width={80}
        height={0}
        src="/XpresFlow.png"
        alt=""
        priority
      />
    </Link>
  );
}

export default Logo;
