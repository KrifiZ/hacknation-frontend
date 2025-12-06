// Stage definitions with editing rules
export const STAGES = {
  CZERWIEC: { 
    pl: "CZERWIEC", 
    en: "June",
    editableFields: ["uzasadnienie"],
    description: "Edytowalne tylko pole 'Uzasadnienie'. Komórki inicjują proces wysyłając sheet."
  },
  LIPIEC_SIERPIEN: { 
    pl: "LIPIEC-SIERPIEŃ", 
    en: "July-August",
    editableFields: ["formulki_finansowe", "formulki_malo_wazne"],
    description: "Edytowalne: Formułki Finansowe oraz Formułki Mało Ważne.",
    canSendLimitSheet: true
  },
  WRZESIEN_LISTOPAD: { 
    pl: "WRZESIEŃ-LISTOPAD", 
    en: "September-November",
    editableFields: ["formulki_finansowe", "formulki_malo_wazne"],
    description: "Edytowalne: Formułki Finansowe oraz Formułki Mało Ważne.",
    canSendLimitSheet: true
  },
  GRUDZIEN: { 
    pl: "GRUDZIEŃ", 
    en: "December",
    editableFields: ["formulki_malo_wazne"],
    description: "Edytowalne tylko Formułki Mało Ważne."
  },
  STYCZEN_LUTY: { 
    pl: "STYCZEŃ-LUTY", 
    en: "January-February",
    editableFields: ["formulki_malo_wazne"],
    description: "Edytowalne tylko Formułki Mało Ważne."
  },
} as const;

export type StageKey = keyof typeof STAGES;
export type BudgetStatus = "approved" | "not_approved" | "not_sent";
export type Tab = "master" | "budgets" | "reports";
export type MessageSender = "bbf" | "komorka";
export type BBFActionType = "pismo" | "extend_deadline" | "limit_sheet";

export interface StageDeadline {
  stage: StageKey;
  defaultDeadline: string;
  departmentExtensions: Record<string, string>;
}

export interface Department {
  id: string;
  name: string;
  budgetStatus: BudgetStatus;
  reportStatus: BudgetStatus;
}

export interface Attachment {
  name: string;
  url: string;
  type: "budget_sheet" | "limit_sheet" | "document" | "other";
}

export interface Message {
  id: string;
  from: MessageSender;
  content: string;
  timestamp: string;
  stage: StageKey;
  attachments?: Attachment[];
  deadline?: string;
  isDeadlineExtension?: boolean;
  isLimitSheet?: boolean;
}
