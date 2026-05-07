"use client";

import { Badge } from "@/components/ui/badge";
import { cn, formatLongDate, formatNaira } from "@/lib/utils";
import type { AnalyticsUserListItem, UserRole } from "@/lib/types/api";

interface UserCardProps {
  user: AnalyticsUserListItem;
  onClick?: () => void;
}

export function RoleBadge({ role }: { role: UserRole }) {
  const isAdmin = role === "ADMIN";
  return (
    <Badge
      className={cn(
        "h-5",
        isAdmin
          ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
          : "bg-neutral-500/15 text-neutral-300 border border-neutral-500/30",
      )}
    >
      {role}
    </Badge>
  );
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 p-3 rounded-lg",
        "border border-white/5 bg-white/[0.02]",
        onClick && "cursor-pointer hover:bg-white/[0.04] transition-colors",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm text-white font-medium truncate">{user.name}</p>
          <RoleBadge role={user.role} />
        </div>
        <p className="text-xs text-neutral-400 truncate">{user.email}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-neutral-500">
          <span>Transfers: {user.transferCount ?? 0}</span>
          <span>
            Last active:{" "}
            {user.lastActive ? formatLongDate(user.lastActive) : "No activity"}
          </span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-white">
          {formatNaira(Number(user.wallet?.balance ?? 0))}
        </p>
        <p className="text-[11px] text-neutral-500">wallet balance</p>
      </div>
    </div>
  );
}
