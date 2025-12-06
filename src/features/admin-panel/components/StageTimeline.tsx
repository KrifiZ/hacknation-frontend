import { STAGES, type StageKey } from "../types";

interface StageTimelineProps {
  currentStage: StageKey;
  stageFilter: StageKey | "all";
  departmentStages: StageKey[];
  onStageFilterChange: (stage: StageKey | "all") => void;
}

export const StageTimeline = ({
  currentStage,
  stageFilter,
  departmentStages,
  onStageFilterChange,
}: StageTimelineProps) => {
  const stageOrder = Object.keys(STAGES) as StageKey[];
  const currentIdx = stageOrder.indexOf(currentStage);

  return (
    <div className="mb-4">
      <div className="flex gap-1 mb-2">
        {Object.entries(STAGES).map(([key, value]) => {
          const stageKey = key as StageKey;
          const isActive = currentStage === stageKey;
          const thisIdx = stageOrder.indexOf(stageKey);
          const isPast = thisIdx < currentIdx;
          const hasMessages = departmentStages.includes(stageKey);
          const isFiltered = stageFilter === stageKey;

          return (
            <button
              key={key}
              onClick={() => (hasMessages ? onStageFilterChange(isFiltered ? "all" : stageKey) : null)}
              disabled={!hasMessages}
              className={`flex-1 p-2 rounded text-center text-xs border relative transition ${
                isFiltered
                  ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300"
                  : isActive
                  ? "bg-blue-500 text-white border-blue-500"
                  : isPast
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-gray-50 text-gray-400 border-gray-200"
              } ${hasMessages ? "cursor-pointer hover:ring-2 hover:ring-blue-200" : "cursor-default opacity-60"}`}
            >
              <div className="font-medium">{value.pl}</div>
              {hasMessages && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 text-center">Kliknij na stage aby przefiltrować wiadomości</p>
    </div>
  );
};
