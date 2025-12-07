// React import not needed with TSX + automatic runtime
import { letterStages, type DepartmentLetter } from '../mocks/department-letters'
import { AttachmentLink } from '../../features/admin-panel/components/AttachmentLink'

export function LettersTimeline({
  thread,
  selectedLetter,
  onSelectLetter,
  onCompose,
}: {
  thread: DepartmentLetter[]
  selectedLetter: DepartmentLetter | null
  onSelectLetter: (m: DepartmentLetter) => void
  onCompose: () => void
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col h-[520px]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Pisma • Oś czasu etapów</h2>
        <button
          onClick={onCompose}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Nowe Pismo
        </button>
      </div>
      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        {letterStages.map((stage) => {
          const items = thread.filter((m) => m.stage === stage)
          return (
            <div key={stage}>
              <div className="text-sm font-medium text-gray-700 mb-2">{stage}</div>
              {items.length === 0 ? (
                <div className="text-sm text-gray-400">Brak pism</div>
              ) : (
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
                  <ul className="space-y-3">
                    {items.map((m) => {
                      const isDept = m.author === 'DEPARTMENT'
                      const dotColor = isDept ? 'bg-blue-500 border-blue-500' : 'bg-rose-500 border-rose-500'
                      const cardColor = isDept ? 'border-blue-200 bg-blue-50' : 'border-rose-200 bg-rose-50'
                      const chipColor = isDept ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                      const idleCard = isDept ? 'border-blue-100 hover:bg-blue-50' : 'border-rose-100 hover:bg-rose-50'
                      const selected = selectedLetter?.id === m.id
                      return (
                        <li key={m.id} className="pl-6">
                          <div className="relative">
                            <span
                              className={`absolute -left-1 top-1 inline-block w-3 h-3 rounded-full border ${dotColor} ${selected ? 'ring-2 ring-blue-300' : ''}`}
                            />
                            <button
                              onClick={() => onSelectLetter(m)}
                              className={`w-full text-left rounded-lg px-3 py-2 border ${selected ? cardColor : idleCard}`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${chipColor}`}>
                                      {isDept ? 'Dział' : 'BBF'}
                                    </span>
                                    <span className="text-xs text-gray-500">{m.date}</span>
                                    {!isDept && m.deadline && (
                                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                                        Termin: {m.deadline}
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1 text-sm text-gray-800 line-clamp-2">{m.content}</div>
                                  {m.tags && m.tags.length > 0 && (
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      {m.tags.map((t) => (
                                        <span
                                          key={t}
                                          className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                                        >
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  {!isDept && m.attachments && m.attachments.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {m.attachments.map((a) => (
                                        <AttachmentLink key={`${m.id}-${a.url}`} attachment={a} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LettersTimeline
