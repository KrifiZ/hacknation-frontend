import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Błąd 404</h1>
          <p className="text-gray-500">Strona nie została znaleziona</p>
        </header>

        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <div className="text-center max-w-md mx-auto">
            {/* 404 Icon */}
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Error Code */}
            <h2 className="text-6xl font-bold text-gray-800 mb-4">404</h2>

            {/* Error Message */}
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Strona nie znaleziona
            </h3>
            <p className="text-gray-500 mb-8">
              Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition hover:bg-blue-600"
              >
                Strona główna
              </Link>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-white text-gray-600 rounded-lg font-medium transition hover:bg-gray-50 border border-gray-200"
              >
                Wróć
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}