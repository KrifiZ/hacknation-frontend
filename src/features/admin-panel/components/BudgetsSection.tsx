export const BudgetsSection = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800">Przegląd Budżetów</h2>
      <p className="text-sm text-gray-500">Budżety i alokacje komórek</p>
    </div>
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-lg font-medium">Brak danych budżetowych</p>
      <p className="text-sm">Informacje o budżetach pojawią się tutaj</p>
    </div>
  </div>
);
