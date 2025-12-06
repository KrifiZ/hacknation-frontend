import { useState } from "react";
import {
  STAGES,
  stageDeadlines,
  CURRENT_STAGE,
  mockMessages,
  type StageKey,
  type BudgetStatus,
  type BBFActionType,
  type Department,
  type Message,
} from "../mocks";
import { StatusBadge } from "./StatusBadge";
import { AttachmentLink } from "./AttachmentLink";
import { BBFActionButton } from "./BBFActionButton";
import { BBFActionModal } from "./BBFActionModal";

interface ReportsSectionProps {
  departments: Department[];
}

export const ReportsSection = ({ departments }: ReportsSectionProps) => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<BudgetStatus | "all">("all");
  const [stageFilter, setStageFilter] = useState<StageKey | "all">("all");
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [showActionModal, setShowActionModal] = useState(false);

  const filtered = departments.filter(d => {
    if (statusFilter !== "all" && d.reportStatus !== statusFilter) return false;
    return true;
  });

  const allMessages = selectedDept ? messages[selectedDept] || [] : [];
  const filteredMessages = stageFilter === "all" 
    ? allMessages 
    : allMessages.filter(m => m.stage === stageFilter);

  // Get unique stages from messages for this department
  const departmentStages = [...new Set(allMessages.map(m => m.stage))];

  // Check if last message is from department
  const lastMessage = allMessages[allMessages.length - 1];
  const canAddBBFAction = lastMessage?.from === "komorka";

  // Check if limit sheet can be sent (only in LIPIEC-LISTOPAD)
  const canSendLimitSheet = CURRENT_STAGE === "LIPIEC_SIERPIEN" || CURRENT_STAGE === "WRZESIEN_LISTOPAD";

  // Get deadline for current department and stage
  const getDepartmentDeadline = (deptId: string, stage: StageKey): string | null => {
    const stageConfig = stageDeadlines.find(s => s.stage === stage);
    if (!stageConfig) return null;
    return stageConfig.departmentExtensions[deptId] || stageConfig.defaultDeadline;
  };

  // Check if department has extended deadline
  const hasExtendedDeadline = (deptId: string, stage: StageKey): boolean => {
    const stageConfig = stageDeadlines.find(s => s.stage === stage);
    return !!(stageConfig?.departmentExtensions[deptId]);
  };

  // Get editable fields description
  const getEditableFieldsText = (stage: StageKey): string => {
    const fields = STAGES[stage].editableFields;
    const fieldNames: Record<string, string> = {
      uzasadnienie: "Uzasadnienie",
      formulki_finansowe: "Formułki Finansowe",
      formulki_malo_wazne: "Formułki Mało Ważne"
    };
    return fields.map(f => fieldNames[f]).join(", ");
  };

  // Handle opening BBF action modal
  const handleOpenActionModal = () => {
    setShowActionModal(true);
  };

  // Submit BBF action with selected action types
  const handleSubmitAction = (data: { 
    content: string; 
    deadline?: string; 
    attachmentFile?: File;
    actionTypes: BBFActionType[];
  }) => {
    if (!selectedDept) return;

    const hasExtendDeadline = data.actionTypes.includes("extend_deadline");
    const hasLimitSheet = data.actionTypes.includes("limit_sheet");

    const newMessage: Message = {
      id: `new-${Date.now()}`,
      from: "bbf",
      content: data.content,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      stage: CURRENT_STAGE,
      deadline: data.deadline,
      isDeadlineExtension: hasExtendDeadline,
      isLimitSheet: hasLimitSheet,
      attachments: hasLimitSheet && data.attachmentFile ? [
        { name: data.attachmentFile.name, url: URL.createObjectURL(data.attachmentFile), type: "limit_sheet" }
      ] : undefined
    };

    setMessages(prev => ({
      ...prev,
      [selectedDept]: [...(prev[selectedDept] || []), newMessage]
    }));

    setShowActionModal(false);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Department List */}
      <div className="col-span-3 space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Komórki</h2>
          <div className="flex flex-wrap gap-1 mb-4">
            {(["all", "approved", "not_approved", "not_sent"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2 py-1 text-xs rounded border transition ${
                  statusFilter === status 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {status === "all" ? "Wszystkie" : status === "not_approved" ? "W trakcie" : status === "not_sent" ? "Brak" : "Zatw."}
              </button>
            ))}
          </div>
          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {filtered.map((dept) => {
              const deadline = getDepartmentDeadline(dept.id, CURRENT_STAGE);
              const hasExtension = hasExtendedDeadline(dept.id, CURRENT_STAGE);
              const deptMessages = messages[dept.id] || [];
              const lastMsg = deptMessages[deptMessages.length - 1];
              const awaitingBBF = lastMsg?.from === "komorka";
              
              return (
                <button
                  key={dept.id}
                  onClick={() => { setSelectedDept(dept.id); setStageFilter("all"); }}
                  className={`w-full p-2 rounded-lg border text-left transition ${
                    selectedDept === dept.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 text-sm">{dept.name}</span>
                      {awaitingBBF && (
                        <span className="w-2 h-2 bg-orange-400 rounded-full" title="Oczekuje na odpowiedź BBF" />
                      )}
                    </div>
                    <StatusBadge status={dept.reportStatus} />
                  </div>
                  {deadline && (
                    <div className={`text-xs mt-1 ${hasExtension ? 'text-amber-600' : 'text-gray-500'}`}>
                      Deadline: {deadline} {hasExtension && "(przedłużony)"}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conversation Details */}
      <div className="col-span-9">
        <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedDept 
                    ? `Konwersacja - ${departments.find(d => d.id === selectedDept)?.name}` 
                    : "Szczegóły wiadomości"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Aktualny stage: <span className="font-medium text-blue-600">{STAGES[CURRENT_STAGE].pl}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Stage Filter */}
          {selectedDept && departmentStages.length > 0 && (
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Filtruj po stage:</span>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setStageFilter("all")}
                    className={`px-2 py-1 text-xs rounded border transition ${
                      stageFilter === "all"
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Wszystkie
                  </button>
                  {departmentStages.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setStageFilter(stage)}
                      className={`px-2 py-1 text-xs rounded border transition ${
                        stageFilter === stage
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
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
              {/* Stage Timeline - Clickable */}
              <div className="mb-4">
                <div className="flex gap-1 mb-2">
                  {Object.entries(STAGES).map(([key, value]) => {
                    const stageKey = key as StageKey;
                    const isActive = CURRENT_STAGE === stageKey;
                    const stageOrder = Object.keys(STAGES);
                    const currentIdx = stageOrder.indexOf(CURRENT_STAGE);
                    const thisIdx = stageOrder.indexOf(key);
                    const isPast = thisIdx < currentIdx;
                    const hasMessages = departmentStages.includes(stageKey);
                    const isFiltered = stageFilter === stageKey;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => hasMessages ? setStageFilter(isFiltered ? "all" : stageKey) : null}
                        disabled={!hasMessages}
                        className={`flex-1 p-2 rounded text-center text-xs border relative transition ${
                          isFiltered
                            ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300'
                            : isActive 
                              ? 'bg-blue-500 text-white border-blue-500' 
                              : isPast 
                                ? 'bg-green-100 text-green-700 border-green-200'
                                : 'bg-gray-50 text-gray-400 border-gray-200'
                        } ${hasMessages ? 'cursor-pointer hover:ring-2 hover:ring-blue-200' : 'cursor-default opacity-60'}`}
                      >
                        <div className="font-medium">{value.pl}</div>
                        {hasMessages && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Kliknij na stage aby przefiltrować wiadomości
                </p>
              </div>

              {/* Editing Rules Info */}
              <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-medium text-slate-700 mb-1">
                      Reguły edycji dla {stageFilter === "all" ? STAGES[CURRENT_STAGE].pl : STAGES[stageFilter].pl}:
                    </h4>
                    <p className="text-sm text-slate-600">
                      Edytowalne pola: <span className="font-medium">{getEditableFieldsText(stageFilter === "all" ? CURRENT_STAGE : stageFilter)}</span>
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div>Deadline stage'a: {stageDeadlines.find(s => s.stage === (stageFilter === "all" ? CURRENT_STAGE : stageFilter))?.defaultDeadline}</div>
                    {selectedDept && hasExtendedDeadline(selectedDept, stageFilter === "all" ? CURRENT_STAGE : stageFilter) && (
                      <div className="text-amber-600">
                        Przedłużony dla tej komórki: {getDepartmentDeadline(selectedDept, stageFilter === "all" ? CURRENT_STAGE : stageFilter)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  Historia konwersacji {stageFilter !== "all" && `(${STAGES[stageFilter].pl})`}
                </h3>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                {filteredMessages.length > 0 ? filteredMessages.map((msg, idx) => {
                  const isKomorka = msg.from === "komorka";
                  const prevMsg = filteredMessages[idx - 1];
                  const showStageHeader = idx === 0 || prevMsg?.stage !== msg.stage;
                  
                  return (
                    <div key={msg.id}>
                      {showStageHeader && (
                        <div className="flex items-center gap-2 my-3">
                          <div className="flex-1 h-px bg-gray-200"></div>
                          <span className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded">
                            {STAGES[msg.stage].pl}
                          </span>
                          <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                      )}
                      <div 
                        className={`p-3 rounded-lg ${
                          isKomorka 
                            ? 'bg-gray-50 border border-gray-200 mr-12' 
                            : msg.isLimitSheet
                              ? 'bg-purple-50 border border-purple-200 ml-12'
                              : 'bg-blue-50 border border-blue-200 ml-12'
                        } ${msg.isDeadlineExtension ? 'ring-2 ring-amber-200' : ''}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-xs font-medium ${
                            isKomorka ? 'text-gray-600' : msg.isLimitSheet ? 'text-purple-600' : 'text-blue-600'
                          }`}>
                            {isKomorka ? "Komórka" : "BBF"}
                            {msg.isDeadlineExtension && (
                              <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                                Przedłużenie terminu
                              </span>
                            )}
                            {msg.isLimitSheet && (
                              <span className="ml-2 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                                Nowe limity MF
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-gray-400">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{msg.content}</p>
                        
                        {/* Attachments */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-200">
                            {msg.attachments.map((att, i) => (
                              <AttachmentLink key={i} attachment={att} />
                            ))}
                          </div>
                        )}
                        
                        {/* Deadline for BBF messages */}
                        {!isKomorka && msg.deadline && !msg.isDeadlineExtension && (
                          <div className="mt-2 pt-2 border-t border-blue-200">
                            <span className="text-xs text-blue-600">
                              Termin odpowiedzi: <span className="font-medium">{msg.deadline}</span>
                            </span>
                          </div>
                        )}
                        {msg.isDeadlineExtension && msg.deadline && (
                          <div className="mt-2 pt-2 border-t border-amber-200">
                            <span className="text-xs text-amber-600">
                              Nowy deadline: <span className="font-medium">{msg.deadline}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-12 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="font-medium">Brak wiadomości</p>
                    <p className="text-sm">
                      {stageFilter !== "all" 
                        ? `Brak wiadomości dla stage'a ${STAGES[stageFilter].pl}` 
                        : "Ta komórka nie ma jeszcze żadnych wiadomości"}
                    </p>
                  </div>
                )}
              </div>

              {/* BBF Action Button - Only visible when last message is from Komórka */}
              {canAddBBFAction && (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-orange-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      Oczekuje na odpowiedź BBF
                    </div>
                    <BBFActionButton 
                      onOpenModal={handleOpenActionModal}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="font-medium">Wybierz komórkę</p>
              <p className="text-sm">Kliknij na komórkę aby zobaczyć konwersację</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && selectedDept && (
        <BBFActionModal
          departmentName={departments.find(d => d.id === selectedDept)?.name || ""}
          onClose={() => setShowActionModal(false)}
          onSubmit={handleSubmitAction}
          canSendLimitSheet={canSendLimitSheet}
          currentDeadline={getDepartmentDeadline(selectedDept, CURRENT_STAGE)}
        />
      )}
    </div>
  );
};
