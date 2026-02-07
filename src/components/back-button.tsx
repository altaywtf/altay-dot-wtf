"use client";

import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SITE_TITLE } from "@/config/meta";
import { usePathHistory } from "@/hooks/use-path-history";

export const BackButton: React.FC<{
  href?: string;
  label?: string;
}> = ({ href = "/", label = SITE_TITLE }) => {
  const router = useRouter();
  const prevPath = usePathHistory();
  const content = (
    <span className="flex items-center gap-1 text-neutral-400 hover:text-neutral-300">
      <MoveLeft className="mt-0.5" />
      {label}
    </span>
  );

  return prevPath === href ? (
    <button className="cursor-pointer" onClick={router.back} type="button">
      {content}
    </button>
  ) : (
    <Link href={href}>{content}</Link>
  );
};
