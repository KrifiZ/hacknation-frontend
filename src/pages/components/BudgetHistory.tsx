import React from 'react'

export type BudgetHistoryGroup = {
  stage: string
  items: { id: string; label: string; date: string }[]
}

export function BudgetHistory({ groups, onSelect }: { groups: BudgetHistoryGroup[]; onSelect: (title: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Historia budżetów</h2>
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.stage}>
            <div className="text-sm font-medium text-gray-700 mb-1">{group.stage}</div>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
              {group.items.map((b) => (
                <button
                  key={b.id}
                  onClick={() => onSelect(`${group.stage}: ${b.label} (${b.date})`)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">{b.label}</span>
                  <span className="text-xs text-gray-500">{b.date}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetHistory
