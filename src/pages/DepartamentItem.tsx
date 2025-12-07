import { Link } from 'react-router'
import DataGridComponent from '../features/datagrid/DataGridComponent'
import type Handsontable from 'handsontable/base'

type Props = {
    canEdit?: boolean
    title?: string
    hideBackLink?: boolean
    onSendClick?: () => void
    dataRows?: Handsontable.CellValue[][]
}

export function DepartamentItem({ canEdit = true, title = 'Current budget', hideBackLink = false, onSendClick, dataRows }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    {!canEdit && (
                        <p className="text-xs text-gray-500 mt-1">Tryb tylko do odczytu</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {canEdit ? (
                        <button
                            onClick={onSendClick}
                            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:opacity-80 cursor-pointer"
                        >
                            Wyślij
                        </button>
                    ) : null}
                    {!hideBackLink && (
                        <Link to={'/department'} className="text-sm text-blue-600 hover:underline">Powrót do działu</Link>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <DataGridComponent canEdit={canEdit} dataRows={dataRows} />
            </div>
        </div>
    )
}

export default DepartamentItem