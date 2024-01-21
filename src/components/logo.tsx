"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export function Logo() {
  const { session, loading } = useAuth();

  if (loading) return <></>;

  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-md border border-orange-200 bg-orange-500"></div>
      <Link
        href={session ? "/dashboard/restaurants" : "/"}
        className="text-lg font-bold"
      >
        Datagrill
      </Link>
    </div>
  );
}
