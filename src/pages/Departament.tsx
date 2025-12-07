import { useEffect, useMemo, useState } from 'react'
import { DepartamentItem } from './DepartamentItem'
import { departmentLettersMock, type DepartmentLetter, type LetterStage } from './mocks/department-letters'
import BudgetHistory from './components/BudgetHistory'
import LettersTimeline from './components/LettersTimeline'
import LetterPreview from './components/LetterPreview'
import ComposeModal from './components/ComposeModal'
import { CURRENT_STAGE } from '../features/admin-panel/mocks/stageDeadlines'
import { DepartamentPipe, ApiBudgetItem  } from '../shared/utils/pipes/departament.pipe'
import type Handsontable from 'handsontable/base'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getDepartmentItems, postEmptyRow } from '../shared/utils/api'

type BudgetHistoryGroup = {
    stage: string
    items: { id: string; label: string; date: string }[]
}

type Letter = DepartmentLetter

export function Departament() {
    const depName = 'Department A'


    const [activeTab, setActiveTab] = useState<'budgets' | 'letters'>('budgets')
    const [selectedBudget, setSelectedBudget] = useState<
        | { mode: 'current'; title: string }
        | { mode: 'history'; title: string }
        | null
    >(null)
    const [isComposeOpen, setComposeOpen] = useState(false)
    const [composeText, setComposeText] = useState('')
    const [budgetRows, setBudgetRows] = useState<Handsontable.CellValue[][]>([])
    const [budgetError, setBudgetError] = useState<string | null>(null)
    const [letters, setLetters] = useState<Letter[]>(departmentLettersMock)
    const [selectedStage, setSelectedStage] = useState<LetterStage>(CURRENT_STAGE)
    const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null)

        const thread = useMemo(() => [...letters].sort((a, b) => a.date.localeCompare(b.date)), [letters])

    const query = useQuery<ApiBudgetItem[]>({queryKey: ['department/budget-items/departments/13'], queryFn: () => getDepartmentItems('1')})

    if (query.isPending || query.isError) {
        return <div>Loading...</div>
    }
    

    const budgetHistory: BudgetHistoryGroup[] = [
        {
            stage: 'Przygotowanie',
            items: [
                { id: 'prep-1', label: 'Wersja 1', date: '2025-09-15' },
                { id: 'prep-2', label: 'Wersja 2', date: '2025-09-28' },
            ],
        },
        {
            stage: 'Weryfikacja',
            items: [
                { id: 'ver-1', label: 'Wersja 3', date: '2025-10-05' },
                { id: 'ver-2', label: 'Wersja 4', date: '2025-10-12' },
            ],
        },
        {
            stage: 'Akceptacja',
            items: [
                { id: 'acc-1', label: 'Wersja 5', date: '2025-10-20' },
            ],
        },
    ]
        // const lettersByStage = useMemo(() => thread.filter(l => l.stage === selectedStage), [thread, selectedStage])
        // const latestBBF = useMemo(() => thread.filter(t => t.author === 'BBF').slice(-1)[0] || null, [thread])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Dział: {depName}</h1>
                    <p className="text-gray-500">Zarządzanie budżetami i korespondencją</p>
                </header>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6">
                    {[
                        { key: 'budgets', label: 'Budżety' },
                        { key: 'letters', label: 'Pisma' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => {
                                setActiveTab(tab.key as 'budgets' | 'letters')
                                setSelectedBudget(null)
                                setSelectedLetter(null)
                            }}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                activeTab === (tab.key as 'budgets' | 'letters')
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Budgets View */}
                {activeTab === 'budgets' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Left: Current budget */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Aktualny budżet</h2>
                                    <p className="text-sm text-gray-500">Ostatnio edytowany: 2025-10-24</p>
                                </div>
                                <button
                                    onClick={() => setSelectedBudget({ mode: 'current', title: 'Aktualny budżet' })}
                                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Otwórz
                                </button>
                            </div>
                            <div className="text-sm text-gray-600">
                                    Podgląd lub edycja bieżącego planu.
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {budgetError ? `Błąd ładowania: ${budgetError}` : `Załadowane pozycje: ${budgetRows.length}`}
                            </div>
                        </div>

                        {/* Right: History grouped by stage */}
                        <BudgetHistory
                            groups={budgetHistory}
                            onSelect={(title) => setSelectedBudget({ mode: 'history', title })}
                        />

                        {/* Selected budget render (full width) */}
                        {selectedBudget && (
                            <div className="lg:col-span-2">
                                <DepartamentItem
                                    canEdit={selectedBudget.mode === 'current'}
                                    title={selectedBudget.title}
                                    hideBackLink
                                    dataRows={query.data ? DepartamentPipe(query.data) : []}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Letters View */}
                {activeTab === 'letters' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Left: Stage Timeline (ReportsSection-like) */}
                        <LettersTimeline
                            thread={thread}
                            selectedLetter={selectedLetter}
                            onSelectLetter={(m) => setSelectedLetter(m)}
                            onCompose={() => setComposeOpen(true)}
                        />

                        {/* Right: Letter preview */}
                        <LetterPreview letter={selectedLetter} />

                        {/* Compose dialog */}
                        <ComposeModal
                            isOpen={isComposeOpen}
                            text={composeText}
                            stage={selectedStage}
                            onStageChange={(s) => setSelectedStage(s)}
                            onTextChange={(t) => setComposeText(t)}
                            onClose={() => setComposeOpen(false)}
                            onSend={() => {
                                if (!composeText.trim()) return
                                const newItem: Letter = {
                                    id: `l-${Date.now()}`,
                                    author: 'DEPARTMENT',
                                    date: new Date().toISOString().slice(0, 10),
                                    content: composeText.trim(),
                                    stage: selectedStage,
                                }
                                setLetters((prev) => [...prev, newItem])
                                setComposeText('')
                                setComposeOpen(false)
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Departament