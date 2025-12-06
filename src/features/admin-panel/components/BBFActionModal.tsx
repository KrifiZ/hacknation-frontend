import { useState } from "react";
import type { BBFActionType } from "../types";

interface BBFActionModalProps {
  type: BBFActionType;
  onClose: () => void;
  onSubmit: (data: { content: string; deadline?: string; attachmentUrl?: string }) => void;
  departmentName: string;
}

export const BBFActionModal = ({ type, onClose, onSubmit, departmentName }: BBFActionModalProps) => {
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");

  const titles: Record<BBFActionType, string> = {
    pismo: "Dodaj pismo",
    extend_deadline: "Przedłuż deadline",
    limit_sheet: "Wyślij nowe limity MF"
  };

  const placeholders: Record<BBFActionType, string> = {
    pismo: "Treść pisma do komórki...",
    extend_deadline: "Uzasadnienie przedłużenia terminu...",
    limit_sheet: "Informacja o nowych limitach z MF..."
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{titles[type]}</h3>
          <p className="text-sm text-gray-500">Do: {departmentName}</p>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treść wiadomości</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholders[type]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>

          {type !== "extend_deadline" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline odpowiedzi
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {type === "extend_deadline" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nowy deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {type === "limit_sheet" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link do arkusza limitów
              </label>
              <input
                type="url"
                value={attachmentUrl}
                onChange={(e) => setAttachmentUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ten arkusz nie będzie walidowany - komórka może później poprosić o przedłużenie limitu.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
          >
            Anuluj
          </button>
          <button
            onClick={() => onSubmit({ content, deadline, attachmentUrl })}
            disabled={!content.trim() || (type === "extend_deadline" && !deadline)}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
};
