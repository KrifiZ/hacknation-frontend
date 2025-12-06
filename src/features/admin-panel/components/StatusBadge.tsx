import type { BudgetStatus } from "../types";

interface StatusBadgeProps {
  status: BudgetStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<BudgetStatus, string> = {
    approved: "bg-green-100 text-green-800 border-green-200",
    not_approved: "bg-amber-100 text-amber-800 border-amber-200",
    not_sent: "bg-gray-100 text-gray-600 border-gray-200",
  };
  const labels: Record<BudgetStatus, string> = {
    approved: "Zatwierdzony",
    not_approved: "W trakcie",
    not_sent: "Brak danych",
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
