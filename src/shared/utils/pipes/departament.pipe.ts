import type Handsontable from 'handsontable/base'
import { DataColumns } from '../../../features/datagrid/view-model/data-grid-view.model'

// Helper type for object refs with id
type RefWithId = { id?: string | number | null }

// Shape from backend; adjust if API changes
export type ApiBudgetItem = {
	id?: string | number | null
	budgetPart?: number | string | RefWithId | null
	budgetPartId?: number | string | null
	section?: number | string | RefWithId | null
	sectionId?: number | string | null
	subSection?: number | string | RefWithId | null
	subSectionId?: number | string | null
	paragraph?: number | string | RefWithId | null
	paragraphId?: number | string | null
	financeSource?: number | string | RefWithId | null
	financeSourceId?: number | string | null
	expenseGroup: string | null
	action?: string | RefWithId | null
	actionId?: string | number | null
	projectName: string | null
	department?: string | RefWithId | null
	departmentId?: string | number | null
	planWI: string | null
	administratorOfFunds: string | null
	budget: string | null
	taskName: string | null
	detailedTaskJustification: string | null
	allocationOfExpenses: string | null
	financialNeedsFor2026: number | string | null
	limitOfExpensesFor2026: number | string | null
	firstMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2026: number | string | null
	agreementNumberFor2026: string | null
	financialNeedsFor2027: number | string | null
	limitOfExpensesFor2027: number | string | null
	secondMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2027: number | string | null
	agreementNumberFor2027: string | null
	financialNeedsFor2028: number | string | null
	limitOfExpensesFor2028: number | string | null
	thirdMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2028: number | string | null
	agreementNumberFor2028: string | null
	financialNeedsFor2029: number | string | null
	limitOfExpensesFor2029: number | string | null
	forthMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2029: number | string | null
	agreementNumberFor2029: string | null
	contractWith: string | null
	legalBasisForSubsidy: string | null
	comments: string | null
	MoneyInAgreementFor2026: number | string | null
}

// Helper to extract id from ref object or return primitive
const extractId = (val: number | string | RefWithId | null | undefined): unknown => {
	if (val === null || val === undefined) return null
	if (typeof val === 'object') return val.id
	return val
}

const toCell = (val: unknown): Handsontable.CellValue => {
	if (val === null || val === undefined) return ''
	// Keep numbers as numbers for numeric columns; stringify others
	return typeof val === 'number' ? val : String(val)
}

export function DepartamentPipe(items: ApiBudgetItem[]): Handsontable.CellValue[][] {
	if (!Array.isArray(items)) return []

	return items.map((it) => {
		const row: Handsontable.CellValue[] = []

		// Counters to disambiguate repeated headers across years
		let agreementAmountIdx = 0 // 2026, 2027, 2028, 2029
		let agreementNumberIdx = 0 // 2026, 2027, 2028, 2029

		for (const col of DataColumns) {
			const h = col.header
			let value: unknown = ''

			switch (h) {
				case 'ID': value = it.id; break
				case 'Część budżetowa': value = extractId(it.budgetPart); break
				case 'Dział': value = extractId(it.section); break
				case 'Rozdział': value = extractId(it.subSection); break
				case 'Paragraf': value = extractId(it.paragraph); break
				case 'Źródło finansowania': value = extractId(it.financeSource); break
				case 'Grupa wydatków': value = it.expenseGroup; break
				case 'Budżet zadaniowy (w pełnej szczegółowości)': value = extractId(it.action); break
				case 'Budżet zadaniowy (nr funkcji, nr zadania)': value = ''; break
				case 'Nazwa programu/projektu': value = it.projectName; break
				case 'Nazwa komórki organizacyjnej': value = extractId(it.department); break
				case 'Plan WI': value = it.planWI; break
				case 'Dysponent środków': value = it.administratorOfFunds; break
				case 'Budżet': value = it.budget; break
				case 'Nazwa zadania': value = it.taskName; break
				case 'Szczegółowe uzasadnienie realizacji zdania': value = it.detailedTaskJustification; break
				case 'Przeznaczenie wydatków wg obszaru działalności: cyberbezpieczeństwo/sztuczna inteligencja/koszty funkcjonowania/inne (wpisać jakie?)': value = it.allocationOfExpenses; break
				case 'Potrzeby finansowe na 2026 rok': value = it.financialNeedsFor2026; break
				case 'Limit wydatków na rok 2026': value = it.limitOfExpensesFor2026; break
				case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 17-kol. 18)':
					value = it.firstMoneyForRealizationIn2026; break
				case 'Kwota zawartej umowy/wniosku o udzielenie zamówienia publicznego':
					switch (agreementAmountIdx++) {
						case 0: value = it.moneyInAgreementFor2026; break
						case 1: value = it.moneyInAgreementFor2027; break
						case 2: value = it.moneyInAgreementFor2028; break
						case 3: value = it.moneyInAgreementFor2029; break
					}
					break
				case 'Nr umowy/nr wniosku o udzielenie zamówienia publicznego':
					switch (agreementNumberIdx++) {
						case 0: value = it.agreementNumberFor2026; break
						case 1: value = it.agreementNumberFor2027; break
						case 2: value = it.agreementNumberFor2028; break
						case 3: value = it.agreementNumberFor2029; break
					}
					break
				case 'Potrzeby finansowe na 2027 rok': value = it.financialNeedsFor2027; break
				case 'Limit wydatków na rok 2027': value = it.limitOfExpensesFor2027; break
				case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 22-kol. 23)':
					value = it.secondMoneyForRealizationIn2026; break
				case 'Potrzeby finansowe na 2028 rok': value = it.financialNeedsFor2028; break
				case 'Limit wydatków na rok 2028': value = it.limitOfExpensesFor2028; break
				case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 27-kol. 28)':
					value = it.thirdMoneyForRealizationIn2026; break
				case 'Potrzeby finansowe na 2029 rok': value = it.financialNeedsFor2029; break
				case 'Limit wydatków na rok 2029': value = it.limitOfExpensesFor2029; break
				case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 32-kol. 33)':
					value = it.forthMoneyForRealizationIn2026; break
				case 'W przypadku dotacji - z kim zawarta umowa/planowana do zawarcia umowa': value = it.contractWith; break
				case 'Podstawa prawna udzielenia dotacji': value = it.legalBasisForSubsidy; break
				case 'Uwagi': value = it.comments; break
			}

			row.push(toCell(value))
		}

		return row
	})
}

// Convert a grid cell back to API value
const fromCell = (val: Handsontable.CellValue): string | number | null => {
	if (val === '' || val === null || val === undefined) return null
	return typeof val === 'number' ? val : String(val)
}

// PUT payload type: uses *Id fields for references
export type ApiBudgetItemPut = {
	budgetPartId: number | string | null
	sectionId: number | string | null
	subSectionId: number | string | null
	paragraphId: number | string | null
	financeSourceId: number | string | null
	expenseGroup: string | null
	actionId: number | string | null
	projectName: string | null
	departmentId: number | string | null
	planWI: string | null
	administratorOfFunds: string | null
	budget: string | null
	taskName: string | null
	detailedTaskJustification: string | null
	allocationOfExpenses: string | null
	financialNeedsFor2026: number | string | null
	limitOfExpensesFor2026: number | string | null
	firstMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2026: number | string | null
	agreementNumberFor2026: string | null
	financialNeedsFor2027: number | string | null
	limitOfExpensesFor2027: number | string | null
	secondMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2027: number | string | null
	agreementNumberFor2027: string | null
	financialNeedsFor2028: number | string | null
	limitOfExpensesFor2028: number | string | null
	thirdMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2028: number | string | null
	agreementNumberFor2028: string | null
	financialNeedsFor2029: number | string | null
	limitOfExpensesFor2029: number | string | null
	forthMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2029: number | string | null
	agreementNumberFor2029: string | null
	contractWith: string | null
	legalBasisForSubsidy: string | null
	comments: string | null
}

// POST payload type: uses plain fields for references (no Id suffix)
export type ApiBudgetItemPost = {
	budgetPart: number | string | null
	section: number | string | null
	subSection: number | string | null
	paragraph: number | string | null
	financeSource: number | string | null
	expenseGroup: string | null
	action: number | string | null
	projectName: string | null
	department: number | string | null
	planWI: string | null
	administratorOfFunds: string | null
	budget: string | null
	taskName: string | null
	detailedTaskJustification: string | null
	allocationOfExpenses: string | null
	financialNeedsFor2026: number | string | null
	limitOfExpensesFor2026: number | string | null
	firstMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2026: number | string | null
	agreementNumberFor2026: string | null
	financialNeedsFor2027: number | string | null
	limitOfExpensesFor2027: number | string | null
	secondMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2027: number | string | null
	agreementNumberFor2027: string | null
	financialNeedsFor2028: number | string | null
	limitOfExpensesFor2028: number | string | null
	thirdMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2028: number | string | null
	agreementNumberFor2028: string | null
	financialNeedsFor2029: number | string | null
	limitOfExpensesFor2029: number | string | null
	forthMoneyForRealizationIn2026: number | string | null
	moneyInAgreementFor2029: number | string | null
	agreementNumberFor2029: string | null
	contractWith: string | null
	legalBasisForSubsidy: string | null
	comments: string | null
}

/**
 * For PUT requests: maps row to payload with *Id fields
 */
export function DepartamentPutPipe(row: Handsontable.CellValue[], dept?: string | number): ApiBudgetItemPut {
	const out: ApiBudgetItemPut = {
		budgetPartId: null,
		sectionId: null,
		subSectionId: null,
		paragraphId: null,
		financeSourceId: null,
		expenseGroup: null,
		actionId: null,
		projectName: null,
		departmentId: dept ?? null,
		planWI: null,
		administratorOfFunds: null,
		budget: null,
		taskName: null,
		detailedTaskJustification: null,
		allocationOfExpenses: null,
		financialNeedsFor2026: null,
		limitOfExpensesFor2026: null,
		firstMoneyForRealizationIn2026: null,
		moneyInAgreementFor2026: null,
		agreementNumberFor2026: null,
		financialNeedsFor2027: null,
		limitOfExpensesFor2027: null,
		secondMoneyForRealizationIn2026: null,
		moneyInAgreementFor2027: null,
		agreementNumberFor2027: null,
		financialNeedsFor2028: null,
		limitOfExpensesFor2028: null,
		thirdMoneyForRealizationIn2026: null,
		moneyInAgreementFor2028: null,
		agreementNumberFor2028: null,
		financialNeedsFor2029: null,
		limitOfExpensesFor2029: null,
		forthMoneyForRealizationIn2026: null,
		moneyInAgreementFor2029: null,
		agreementNumberFor2029: null,
		contractWith: null,
		legalBasisForSubsidy: null,
		comments: null,
	}

	let agreementAmountIdx = 0
	let agreementNumberIdx = 0

	DataColumns.forEach((col, i) => {
		const h = col.header
		const v = fromCell(row[i])
		switch (h) {
			case 'Część budżetowa': out.budgetPartId = v; break
			case 'Dział': out.sectionId = v; break
			case 'Rozdział': out.subSectionId = v; break
			case 'Paragraf': out.paragraphId = v; break
			case 'Źródło finansowania': out.financeSourceId = v; break
			case 'Grupa wydatków': out.expenseGroup = v as string | null; break
			case 'Budżet zadaniowy (w pełnej szczegółowości)': out.actionId = v; break
			case 'Budżet zadaniowy (nr funkcji, nr zadania)': break
			case 'Nazwa programu/projektu': out.projectName = v as string | null; break
			case 'Nazwa komórki organizacyjnej': out.departmentId = dept ?? v; break
			case 'Plan WI': out.planWI = v as string | null; break
			case 'Dysponent środków': out.administratorOfFunds = v as string | null; break
			case 'Budżet': out.budget = v as string | null; break
			case 'Nazwa zadania': out.taskName = v as string | null; break
			case 'Szczegółowe uzasadnienie realizacji zdania': out.detailedTaskJustification = v as string | null; break
			case 'Przeznaczenie wydatków wg obszaru działalności: cyberbezpieczeństwo/sztuczna inteligencja/koszty funkcjonowania/inne (wpisać jakie?)': out.allocationOfExpenses = v as string | null; break
			case 'Potrzeby finansowe na 2026 rok': out.financialNeedsFor2026 = v; break
			case 'Limit wydatków na rok 2026': out.limitOfExpensesFor2026 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 17-kol. 18)': out.firstMoneyForRealizationIn2026 = v; break
			case 'Kwota zawartej umowy/wniosku o udzielenie zamówienia publicznego':
				switch (agreementAmountIdx++) {
					case 0: out.moneyInAgreementFor2026 = v; break
					case 1: out.moneyInAgreementFor2027 = v; break
					case 2: out.moneyInAgreementFor2028 = v; break
					case 3: out.moneyInAgreementFor2029 = v; break
				}
				break
			case 'Nr umowy/nr wniosku o udzielenie zamówienia publicznego':
				switch (agreementNumberIdx++) {
					case 0: out.agreementNumberFor2026 = v as string | null; break
					case 1: out.agreementNumberFor2027 = v as string | null; break
					case 2: out.agreementNumberFor2028 = v as string | null; break
					case 3: out.agreementNumberFor2029 = v as string | null; break
				}
				break
			case 'Potrzeby finansowe na 2027 rok': out.financialNeedsFor2027 = v; break
			case 'Limit wydatków na rok 2027': out.limitOfExpensesFor2027 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 22-kol. 23)': out.secondMoneyForRealizationIn2026 = v; break
			case 'Potrzeby finansowe na 2028 rok': out.financialNeedsFor2028 = v; break
			case 'Limit wydatków na rok 2028': out.limitOfExpensesFor2028 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 27-kol. 28)': out.thirdMoneyForRealizationIn2026 = v; break
			case 'Potrzeby finansowe na 2029 rok': out.financialNeedsFor2029 = v; break
			case 'Limit wydatków na rok 2029': out.limitOfExpensesFor2029 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 32-kol. 33)': out.forthMoneyForRealizationIn2026 = v; break
			case 'W przypadku dotacji - z kim zawarta umowa/planowana do zawarcia umowa': out.contractWith = v as string | null; break
			case 'Podstawa prawna udzielenia dotacji': out.legalBasisForSubsidy = v as string | null; break
			case 'Uwagi': out.comments = v as string | null; break
		}
	})

	return out
}

/**
 * For POST requests: maps row to payload with plain fields (no Id suffix)
 */
export function DepartamentPostPipe(row: Handsontable.CellValue[], dept?: string | number): ApiBudgetItemPost {
	const out: ApiBudgetItemPost = {
		budgetPart: null,
		section: null,
		subSection: null,
		paragraph: null,
		financeSource: null,
		expenseGroup: null,
		action: null,
		projectName: null,
		department: dept ?? null,
		planWI: null,
		administratorOfFunds: null,
		budget: null,
		taskName: null,
		detailedTaskJustification: null,
		allocationOfExpenses: null,
		financialNeedsFor2026: null,
		limitOfExpensesFor2026: null,
		firstMoneyForRealizationIn2026: null,
		moneyInAgreementFor2026: null,
		agreementNumberFor2026: null,
		financialNeedsFor2027: null,
		limitOfExpensesFor2027: null,
		secondMoneyForRealizationIn2026: null,
		moneyInAgreementFor2027: null,
		agreementNumberFor2027: null,
		financialNeedsFor2028: null,
		limitOfExpensesFor2028: null,
		thirdMoneyForRealizationIn2026: null,
		moneyInAgreementFor2028: null,
		agreementNumberFor2028: null,
		financialNeedsFor2029: null,
		limitOfExpensesFor2029: null,
		forthMoneyForRealizationIn2026: null,
		moneyInAgreementFor2029: null,
		agreementNumberFor2029: null,
		contractWith: null,
		legalBasisForSubsidy: null,
		comments: null,
	}

	let agreementAmountIdx = 0
	let agreementNumberIdx = 0

	DataColumns.forEach((col, i) => {
		const h = col.header
		const v = fromCell(row[i])
		switch (h) {
			case 'Część budżetowa': out.budgetPart = v; break
			case 'Dział': out.section = v; break
			case 'Rozdział': out.subSection = v; break
			case 'Paragraf': out.paragraph = v; break
			case 'Źródło finansowania': out.financeSource = v; break
			case 'Grupa wydatków': out.expenseGroup = v as string | null; break
			case 'Budżet zadaniowy (w pełnej szczegółowości)': out.action = v; break
			case 'Budżet zadaniowy (nr funkcji, nr zadania)': break
			case 'Nazwa programu/projektu': out.projectName = v as string | null; break
			case 'Nazwa komórki organizacyjnej': out.department = dept ?? v; break
			case 'Plan WI': out.planWI = v as string | null; break
			case 'Dysponent środków': out.administratorOfFunds = v as string | null; break
			case 'Budżet': out.budget = v as string | null; break
			case 'Nazwa zadania': out.taskName = v as string | null; break
			case 'Szczegółowe uzasadnienie realizacji zdania': out.detailedTaskJustification = v as string | null; break
			case 'Przeznaczenie wydatków wg obszaru działalności: cyberbezpieczeństwo/sztuczna inteligencja/koszty funkcjonowania/inne (wpisać jakie?)': out.allocationOfExpenses = v as string | null; break
			case 'Potrzeby finansowe na 2026 rok': out.financialNeedsFor2026 = v; break
			case 'Limit wydatków na rok 2026': out.limitOfExpensesFor2026 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 17-kol. 18)': out.firstMoneyForRealizationIn2026 = v; break
			case 'Kwota zawartej umowy/wniosku o udzielenie zamówienia publicznego':
				switch (agreementAmountIdx++) {
					case 0: out.moneyInAgreementFor2026 = v; break
					case 1: out.moneyInAgreementFor2027 = v; break
					case 2: out.moneyInAgreementFor2028 = v; break
					case 3: out.moneyInAgreementFor2029 = v; break
				}
				break
			case 'Nr umowy/nr wniosku o udzielenie zamówienia publicznego':
				switch (agreementNumberIdx++) {
					case 0: out.agreementNumberFor2026 = v as string | null; break
					case 1: out.agreementNumberFor2027 = v as string | null; break
					case 2: out.agreementNumberFor2028 = v as string | null; break
					case 3: out.agreementNumberFor2029 = v as string | null; break
				}
				break
			case 'Potrzeby finansowe na 2027 rok': out.financialNeedsFor2027 = v; break
			case 'Limit wydatków na rok 2027': out.limitOfExpensesFor2027 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 22-kol. 23)': out.secondMoneyForRealizationIn2026 = v; break
			case 'Potrzeby finansowe na 2028 rok': out.financialNeedsFor2028 = v; break
			case 'Limit wydatków na rok 2028': out.limitOfExpensesFor2028 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 27-kol. 28)': out.thirdMoneyForRealizationIn2026 = v; break
			case 'Potrzeby finansowe na 2029 rok': out.financialNeedsFor2029 = v; break
			case 'Limit wydatków na rok 2029': out.limitOfExpensesFor2029 = v; break
			case 'Kwota na realizację zadań w 2026 roku, która nie została zabezpieczona w limicie (kol. 32-kol. 33)': out.forthMoneyForRealizationIn2026 = v; break
			case 'W przypadku dotacji - z kim zawarta umowa/planowana do zawarcia umowa': out.contractWith = v as string | null; break
			case 'Podstawa prawna udzielenia dotacji': out.legalBasisForSubsidy = v as string | null; break
			case 'Uwagi': out.comments = v as string | null; break
		}
	})

	return out
}