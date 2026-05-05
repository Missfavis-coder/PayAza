import { AlertCircle } from "lucide-react";

type EscrowStatus = "RELEASE_REQUESTED" | "PENDING" | "COMPLETED" | "DISPUTED";

export function StatusBadge({ status }: { status: EscrowStatus }) {
  const styles = {
    RELEASE_REQUESTED: "text-cyan-500 dark:bg-slate-50/10 bg-blue-50",
    PENDING: "text-yellow-600 bg-yellow-50",
    COMPLETED: "text-green-600 bg-green-50",
    DISPUTED: "text-red-600 bg-red-50",
  };

  return (
    <span className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold w-fit ${styles[status]}`}>
      <AlertCircle size={12} />
      {status.replace("_", " ")}
    </span>
  );
}