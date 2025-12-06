import type { StageDeadline, StageKey } from "../types";

export const stageDeadlines: StageDeadline[] = [
  { stage: "CZERWIEC", defaultDeadline: "2024-06-30", departmentExtensions: { "4": "2024-07-05" } },
  { stage: "LIPIEC_SIERPIEN", defaultDeadline: "2024-08-31", departmentExtensions: { "2": "2024-09-05" } },
  { stage: "WRZESIEN_LISTOPAD", defaultDeadline: "2024-11-30", departmentExtensions: {} },
  { stage: "GRUDZIEN", defaultDeadline: "2024-12-31", departmentExtensions: {} },
  { stage: "STYCZEN_LUTY", defaultDeadline: "2025-02-28", departmentExtensions: {} },
];

export const CURRENT_STAGE: StageKey = "WRZESIEN_LISTOPAD";
