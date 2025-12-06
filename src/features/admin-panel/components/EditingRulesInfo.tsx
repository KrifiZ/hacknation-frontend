import { STAGES, type StageKey } from "../types";
import { stageDeadlines } from "../mocks";

interface EditingRulesInfoProps {
  stageFilter: StageKey | "all";
  currentStage: StageKey;
  selectedDept: string | null;
  getDepartmentDeadline: (deptId: string, stage: StageKey) => string | null;
  hasExtendedDeadline: (deptId: string, stage: StageKey) => boolean;
}

// Get editable fields description
const getEditableFieldsText = (stage: StageKey): string => {
  const fields = STAGES[stage].editableFields;
  const fieldNames: Record<string, string> = {
    uzasadnienie: "Uzasadnienie",
    formulki_finansowe: "Formułki Finansowe",
    formulki_malo_wazne: "Formułki Mało Ważne",
  };
  return fields.map((f) => fieldNames[f]).join(", ");
};

export const EditingRulesInfo = ({
  stageFilter,
  currentStage,
  selectedDept,
  getDepartmentDeadline,
  hasExtendedDeadline,
}: EditingRulesInfoProps) => {
  const activeStage = stageFilter === "all" ? currentStage : stageFilter;
  const stageDeadline = stageDeadlines.find((s) => s.stage === activeStage)?.defaultDeadline;

  return (
    <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xs font-medium text-slate-700 mb-1">
            Reguły edycji dla {STAGES[activeStage].pl}:
          </h4>
          <p className="text-sm text-slate-600">
            Edytowalne pola: <span className="font-medium">{getEditableFieldsText(activeStage)}</span>
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div>Deadline stage'a: {stageDeadline}</div>
          {selectedDept && hasExtendedDeadline(selectedDept, activeStage) && (
            <div className="text-amber-600">
              Przedłużony dla tej komórki: {getDepartmentDeadline(selectedDept, activeStage)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
