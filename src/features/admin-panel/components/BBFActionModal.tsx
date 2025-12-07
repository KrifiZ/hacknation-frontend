import { useState, useMemo } from "react";
import type { BBFActionType } from "../types";

interface BBFActionModalProps {
  onClose: () => void;
  onSubmit: (data: { 
    content: string; 
    deadline?: string; 
    attachmentFile?: File;
    actionTypes: BBFActionType[];
  }) => void;
  departmentName: string;
  canSendLimitSheet: boolean;
  currentDeadline: string | null;
}

export const BBFActionModal = ({ 
  onClose, 
  onSubmit, 
  departmentName, 
  canSendLimitSheet,
  currentDeadline 
}: BBFActionModalProps) => {
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  // Pismo is always selected, extend_deadline and limit_sheet are optional additions
  const [extendDeadline, setExtendDeadline] = useState(false);
  const [sendLimitSheet, setSendLimitSheet] = useState(false);

  // Check if current deadline has been reached (but only if not extending with a valid new date)
  const isDeadlineReached = useMemo(() => {
    if (!currentDeadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(currentDeadline);
    deadlineDate.setHours(0, 0, 0, 0);
    return today > deadlineDate;
  }, [currentDeadline]);

  // Check if the new deadline fixes the issue (is in the future)
  const isNewDeadlineValid = useMemo(() => {
    if (!deadline || !extendDeadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newDeadlineDate = new Date(deadline);
    newDeadlineDate.setHours(0, 0, 0, 0);
    return newDeadlineDate >= today;
  }, [deadline, extendDeadline]);

  // Show deadline warning only if deadline is reached AND not fixed by new deadline
  const showDeadlineWarning = isDeadlineReached && !isNewDeadlineValid;

  // Build selected actions array (pismo is always included)
  const selectedActions: BBFActionType[] = useMemo(() => {
    const actions: BBFActionType[] = ["pismo"];
    if (extendDeadline) actions.push("extend_deadline");
    if (sendLimitSheet) actions.push("limit_sheet");
    return actions;
  }, [extendDeadline, sendLimitSheet]);

  const canSubmit = 
    content.trim() && 
    (!extendDeadline || deadline) &&
    (!sendLimitSheet || attachmentFile);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Dodaj akcję BBF</h3>
          <p className="text-xs sm:text-sm text-gray-500">Do: {departmentName}</p>
        </div>
        
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          {/* Deadline warning - shown when deadline is reached and not fixed */}
          {showDeadlineWarning && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-medium text-red-700">
                  Deadline ({currentDeadline}) został przekroczony
                </span>
              </div>
            </div>
          )}

          {/* Action Type - Pismo always checked, additional options below */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Typ akcji</label>
            <div className="space-y-2">
              {/* Pismo - always checked, disabled */}
              <label className="flex items-center gap-3 p-2 rounded-lg border border-blue-200 bg-blue-50 cursor-default">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 text-blue-500 rounded border-gray-300"
                />
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">Dodaj pismo</span>
                <span className="text-xs text-gray-400 ml-auto">(zawsze)</span>
              </label>

              {/* Extend deadline - optional */}
              <label className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={extendDeadline}
                  onChange={(e) => setExtendDeadline(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                />
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-700">Przedłuż deadline</span>
              </label>

              {/* Limit sheet - optional, only when allowed */}
              {canSendLimitSheet && (
                <label className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendLimitSheet}
                    onChange={(e) => setSendLimitSheet(e.target.checked)}
                    className="w-4 h-4 text-purple-500 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-700">Wyślij nowe limity MF</span>
                </label>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treść wiadomości</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Treść pisma do komórki..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>

          {/* Deadline input - only shown when extend_deadline is checked */}
          {extendDeadline && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nowy deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Attachment file picker for limit sheet */}
          {sendLimitSheet && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plik z limitami (PDF) <span className="text-red-500">*</span>
              </label>
              {attachmentFile ? (
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-3 9h4v1h-4v-1zm0 2h4v1h-4v-1zm-2-2h1v4H8v-4z"/>
                  </svg>
                  <span className="text-sm text-gray-700 flex-1 truncate">{attachmentFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachmentFile(null)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-xs text-gray-500">Kliknij aby wybrać plik PDF</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.type === 'application/pdf') {
                        setAttachmentFile(file);
                      }
                      e.target.value = '';
                    }}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Dozwolony format: PDF. Maksymalnie 1 plik.
              </p>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 border-t border-gray-200 flex justify-end gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
          >
            Anuluj
          </button>
          <button
            onClick={() => onSubmit({ content, deadline, attachmentFile: attachmentFile || undefined, actionTypes: selectedActions })}
            disabled={!canSubmit}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
};
