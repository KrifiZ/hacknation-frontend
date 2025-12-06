import type { Department, BudgetStatus } from "../types";

export const DEPARTMENT_NAMES = "ABCDEFGHIJKLMNOP".split("");

export const mockDepartments: Department[] = DEPARTMENT_NAMES.map((letter, index) => ({
  id: String(index + 1),
  name: `Komórka ${letter}`,
  budgetStatus: ["approved", "not_approved", "not_sent"][index % 3] as BudgetStatus,
  reportStatus: ["approved", "not_approved", "not_sent"][index % 3] as BudgetStatus,
}));
