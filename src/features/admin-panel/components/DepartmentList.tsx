import { StatusBadge } from "./StatusBadge";
import type { Department, Message, StageKey, BudgetStatus } from "../types";

interface DepartmentListProps {
  departments: Department[];
  messages: Record<string, Message[]>;
  selectedDept: string | null;
  statusFilter: BudgetStatus | "all";
  currentStage: StageKey;
  onSelectDept: (deptId: string) => void;
  onStatusFilterChange: (status: BudgetStatus | "all") => void;
  getDepartmentDeadline: (deptId: string, stage: StageKey) => string | null;
  hasExtendedDeadline: (deptId: string, stage: StageKey) => boolean;
}

export const DepartmentList = ({
  departments,
  messages,
  selectedDept,
  statusFilter,
  currentStage,
  onSelectDept,
  onStatusFilterChange,
  getDepartmentDeadline,
  hasExtendedDeadline,
}: DepartmentListProps) => {
  const filtered = departments.filter((d) => {
    if (statusFilter !== "all" && d.reportStatus !== statusFilter) return false;
    return true;
  });

  return (
    <div className="col-span-3 space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Komórki</h2>
        <div className="flex flex-wrap gap-1 mb-4">
          {(["all", "approved", "not_approved", "not_sent"] as const).map((status) => (
            <button
              key={status}
              onClick={() => onStatusFilterChange(status)}
              className={`px-2 py-1 text-xs rounded border transition ${
                statusFilter === status
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              {status === "all"
                ? "Wszystkie"
                : status === "not_approved"
                ? "W trakcie"
                : status === "not_sent"
                ? "Brak"
                : "Zatw."}
            </button>
          ))}
        </div>
        <div className="space-y-1 max-h-[500px] overflow-y-auto">
          {filtered.map((dept) => {
            const deadline = getDepartmentDeadline(dept.id, currentStage);
            const hasExtension = hasExtendedDeadline(dept.id, currentStage);
            const deptMessages = messages[dept.id] || [];
            const lastMsg = deptMessages[deptMessages.length - 1];
            const awaitingBBF = lastMsg?.from === "komorka";

            return (
              <button
                key={dept.id}
                onClick={() => onSelectDept(dept.id)}
                className={`w-full p-2 rounded-lg border text-left transition ${
                  selectedDept === dept.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800 text-sm">{dept.name}</span>
                    {awaitingBBF && (
                      <span
                        className="w-2 h-2 bg-orange-400 rounded-full"
                        title="Oczekuje na odpowiedź BBF"
                      />
                    )}
                  </div>
                  <StatusBadge status={dept.reportStatus} />
                </div>
                {deadline && (
                  <div
                    className={`text-xs mt-1 ${hasExtension ? "text-amber-600" : "text-gray-500"}`}
                  >
                    Deadline: {deadline} {hasExtension && "(przedłużony)"}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
