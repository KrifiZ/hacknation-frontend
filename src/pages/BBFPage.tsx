import { useState } from "react";
import { mockDepartments, type Tab } from "../features/admin-panel/mocks";
import { MasterTable, BudgetsSection, ReportsSection } from "../features/admin-panel/components";

export function BBFAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("reports");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel Administracyjny BBF</h1>
          <p className="text-gray-500">Moduł wymiany pism budżetowych</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {([
            { key: "master", label: "Tabela Główna" },
            { key: "budgets", label: "Budżety" },
            { key: "reports", label: "Pisma" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "master" && <MasterTable />}
        {activeTab === "budgets" && <BudgetsSection />}
        {activeTab === "reports" && <ReportsSection departments={mockDepartments} />}
      </div>
    </div>
  );
}

export default BBFAdminPage;
