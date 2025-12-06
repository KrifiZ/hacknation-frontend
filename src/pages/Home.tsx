import { useState } from 'react'
import { Link } from 'react-router'

export function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">HackNation</h1>
          <div className="flex gap-4">
            <Link to="/" className="text-white hover:text-white/80 transition-colors">Home</Link>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Welcome to HackNation
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Build amazing things with React and Tailwind CSS. Start your journey today!
          </p>

          {/* Counter Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto mb-12 border border-white/30">
            <p className="text-white/70 mb-4">Interactive Counter</p>
            <p className="text-6xl font-bold text-white mb-6">{count}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCount(count - 1)}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 font-semibold"
              >
                Decrease
              </button>
              <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-3 bg-white hover:bg-white/90 text-purple-600 rounded-lg transition-all duration-200 font-semibold"
              >
                Increase check
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
