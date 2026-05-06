import { TransactionUI } from "../page";
import { cn } from "@/lib/utils";


export const StatusBadge = ({ status }: { status: TransactionUI["status"] }) => {
    const colors = {
      Successful: "text-emerald-500",
      Pending: "text-amber-500",
      Failed: "text-red-500",
    };
  
    return (
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            "h-1 w-1 rounded-full",
            status === "Successful"
              ? "bg-emerald-500"
              : status === "Pending"
              ? "bg-amber-500"
              : "bg-red-500"
          )}
        />
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            colors[status]
          )}
        >
          {status}
        </span>
      </div>
    );
  };