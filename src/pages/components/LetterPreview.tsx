// React import not needed with TSX + automatic runtime
import type { DepartmentLetter } from '../mocks/department-letters'
import { AttachmentLink } from '../../features/admin-panel/components/AttachmentLink'

export function LetterPreview({ letter }: { letter: DepartmentLetter | null }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 relative flex flex-col h-[520px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Podgląd pisma</h2>
      {letter ? (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
              letter.author === 'DEPARTMENT' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}>
              {letter.author === 'DEPARTMENT' ? 'Dział' : 'BBF'}
            </span>
            <span className="text-xs text-gray-600">{letter.date}</span>
            <span className="text-xs text-gray-400">• {letter.stage}</span>
            {letter.author === 'BBF' && letter.deadline && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                Termin: {letter.deadline}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700 whitespace-pre-line">{letter.content}</div>
          {letter.tags && letter.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {letter.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                  {t}
                </span>
              ))}
            </div>
          )}
          {letter.author === 'BBF' && letter.attachments && letter.attachments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {letter.attachments.map((a) => (
                <AttachmentLink key={`${letter.id}-${a.url}`} attachment={a} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <p className="text-sm text-gray-500">Wybierz pismo po lewej aby zobaczyć podgląd.</p>
        </div>
      )}
    </div>
  )
}

export default LetterPreview
