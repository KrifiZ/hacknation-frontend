export const MasterTable = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800">Tabela Główna</h2>
      <p className="text-sm text-gray-500">Kompletny przegląd danych budżetowych</p>
    </div>
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-lg font-medium">Brak danych</p>
      <p className="text-sm">Dane tabeli głównej pojawią się tutaj</p>
    </div>
  </div>
);
