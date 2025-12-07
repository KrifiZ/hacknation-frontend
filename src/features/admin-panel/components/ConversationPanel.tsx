import { STAGES, type Department, type Message, type StageKey } from "../types";
import { StageTimeline } from "./StageTimeline";
import { EditingRulesInfo } from "./EditingRulesInfo";
import { MessageList } from "./MessageList";
import { BBFActionButton } from "./BBFActionButton";

interface ConversationPanelProps {
  selectedDept: string | null;
  departments: Department[];
  filteredMessages: Message[];
  departmentStages: StageKey[];
  currentStage: StageKey;
  stageFilter: StageKey | "all";
  canAddBBFAction: boolean;
  isTyping?: boolean;
  onStageFilterChange: (stage: StageKey | "all") => void;
  onOpenActionModal: () => void;
  getDepartmentDeadline: (deptId: string, stage: StageKey) => string | null;
  hasExtendedDeadline: (deptId: string, stage: StageKey) => boolean;
}

export const ConversationPanel = ({
  selectedDept,
  departments,
  filteredMessages,
  departmentStages,
  currentStage,
  stageFilter,
  canAddBBFAction,
  isTyping,
  onStageFilterChange,
  onOpenActionModal,
  getDepartmentDeadline,
  hasExtendedDeadline,
}: ConversationPanelProps) => {
  const selectedDepartment = departments.find((d) => d.id === selectedDept);

  return (
    <div className="col-span-9">
      <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedDept
                  ? `Konwersacja - ${selectedDepartment?.name}`
                  : "Szczegóły wiadomości"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Aktualny stage: <span className="font-medium text-blue-600">{STAGES[currentStage].pl}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stage Filter Buttons */}
        {selectedDept && departmentStages.length > 0 && (
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Filtruj po stage:</span>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => onStageFilterChange("all")}
                  className={`px-2 py-1 text-xs rounded border transition ${
                    stageFilter === "all"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Wszystkie
                </button>
                {departmentStages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => onStageFilterChange(stage)}
                    className={`px-2 py-1 text-xs rounded border transition ${
                      stageFilter === stage
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {STAGES[stage].pl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedDept ? (
          <div className="p-4 flex-1 overflow-hidden flex flex-col">
            {/* Stage Timeline */}
            <StageTimeline
              currentStage={currentStage}
              stageFilter={stageFilter}
              departmentStages={departmentStages}
              onStageFilterChange={onStageFilterChange}
            />

            {/* Editing Rules Info */}
            <EditingRulesInfo
              stageFilter={stageFilter}
              currentStage={currentStage}
              selectedDept={selectedDept}
              getDepartmentDeadline={getDepartmentDeadline}
              hasExtendedDeadline={hasExtendedDeadline}
            />

            {/* Messages Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Historia konwersacji {stageFilter !== "all" && `(${STAGES[stageFilter].pl})`}
              </h3>
            </div>

            {/* Messages */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              <MessageList messages={filteredMessages} stageFilter={stageFilter} isTyping={isTyping} />
            </div>

            {/* BBF Action Button */}
            {canAddBBFAction && (
              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-orange-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                    Oczekuje na odpowiedź BBF
                  </div>
                  <BBFActionButton onOpenModal={onOpenActionModal} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyConversationState />
        )}
      </div>
    </div>
  );
};

const EmptyConversationState = () => (
  <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
    <p className="font-medium">Wybierz komórkę</p>
    <p className="text-sm">Kliknij na komórkę aby zobaczyć konwersację</p>
  </div>
);
