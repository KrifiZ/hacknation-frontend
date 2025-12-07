// React import not needed with TSX + automatic runtime
import { type LetterStage } from '../mocks/department-letters'
import { CURRENT_STAGE } from '../../features/admin-panel/mocks/stageDeadlines'

export function ComposeModal({
  isOpen,
  text,
  stage,
  onStageChange,
  onTextChange,
  onClose,
  onSend,
}: {
  isOpen: boolean
  text: string
  stage: LetterStage
  onStageChange: (s: LetterStage) => void
  onTextChange: (t: string) => void
  onClose: () => void
  onSend: () => void
}) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Nowe pismo do BBF</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>×</button>
        </div>
        <div className="mb-2">
          <label className="block text-xs text-gray-600 mb-1">Etap (bieżący)</label>
          <select
            className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 text-gray-700"
            value={stage}
            onChange={(e) => onStageChange(e.target.value as LetterStage)}
            disabled
          >
            <option value={CURRENT_STAGE}>{CURRENT_STAGE}</option>
          </select>
        </div>
        <div>
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Wpisz treść pisma..."
            className="w-full h-40 border border-gray-200 rounded-lg p-2 text-sm"
          />
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <button
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Anuluj
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            onClick={onSend}
          >
            Wyślij
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComposeModal
