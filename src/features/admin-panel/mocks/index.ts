// Re-export all mocks
export { stageDeadlines, CURRENT_STAGE } from "./stageDeadlines";
export { DEPARTMENT_NAMES, mockDepartments } from "./departments";
export { mockMessages } from "./messages";

// Re-export types for convenience
export type {
  StageKey,
  BudgetStatus,
  Tab,
  MessageSender,
  BBFActionType,
  StageDeadline,
  Department,
  Attachment,
  Message,
} from "../types";
export { STAGES } from "../types";