import { useState, useCallback, useEffect, useRef } from "react";
import {
  stageDeadlines,
  CURRENT_STAGE,
  mockMessages,
  type StageKey,
  type BudgetStatus,
  type BBFActionType,
  type Department,
  type Message,
} from "../mocks";
import { DepartmentList } from "./DepartmentList";
import { ConversationPanel } from "./ConversationPanel";
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
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

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
  const getDepartmentDeadline = useCallback((deptId: string, stage: StageKey): string | null => {
    const stageConfig = stageDeadlines.find(s => s.stage === stage);
    if (!stageConfig) return null;
    return stageConfig.departmentExtensions[deptId] || stageConfig.defaultDeadline;
  }, []);

  // Check if department has extended deadline
  const hasExtendedDeadline = useCallback((deptId: string, stage: StageKey): boolean => {
    const stageConfig = stageDeadlines.find(s => s.stage === stage);
    return !!(stageConfig?.departmentExtensions[deptId]);
  }, []);

  // Handle department selection
  const handleSelectDept = useCallback((deptId: string) => {
    setSelectedDept(deptId);
    setStageFilter("all");
  }, []);

  // Handle opening BBF action modal
  const handleOpenActionModal = useCallback(() => {
    setShowActionModal(true);
  }, []);

  // Handle stage filter change
  const handleStageFilterChange = useCallback((stage: StageKey | "all") => {
    setStageFilter(stage);
  }, []);

  // Submit BBF action with selected action types
  const handleSubmitAction = useCallback((data: { 
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

    // Show typing indicator after message is sent (endless)
    setIsTyping(true);
  }, [selectedDept]);

  return (
    <div className="grid grid-cols-12 gap-4 h-[calc(100vh-50px)]">
      {/* Department List */}
      <DepartmentList
        departments={departments}
        messages={messages}
        selectedDept={selectedDept}
        statusFilter={statusFilter}
        currentStage={CURRENT_STAGE}
        onSelectDept={handleSelectDept}
        onStatusFilterChange={setStatusFilter}
        getDepartmentDeadline={getDepartmentDeadline}
        hasExtendedDeadline={hasExtendedDeadline}
      />

      {/* Conversation Panel */}
      <ConversationPanel
        selectedDept={selectedDept}
        departments={departments}
        filteredMessages={filteredMessages}
        departmentStages={departmentStages}
        currentStage={CURRENT_STAGE}
        stageFilter={stageFilter}
        canAddBBFAction={canAddBBFAction}
        isTyping={isTyping}
        onStageFilterChange={handleStageFilterChange}
        onOpenActionModal={handleOpenActionModal}
        getDepartmentDeadline={getDepartmentDeadline}
        hasExtendedDeadline={hasExtendedDeadline}
      />

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
