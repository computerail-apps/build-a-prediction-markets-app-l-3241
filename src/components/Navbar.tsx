type Props = { tab: string; setTab: (t: any) => void; user: string | null; setShowAuth: (v: boolean) => void; balance: number }
export default function Navbar({ tab, setTab, user, setShowAuth, balance }: Props) {
  return (
    <nav className="border-b border-gray-800 bg-gray-950 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold text-indigo-400">PredictX</span>
          <button onClick={() => setTab('markets')} className={`text-sm font-medium ${tab === 'markets' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Markets</button>
          <button onClick={() => setTab('portfolio')} className={`text-sm font-medium ${tab === 'portfolio' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Portfolio</button>
        </div>
        <div className="flex items-center gap-3">
          {user && <span className="text-sm text-emerald-400 font-mono">${balance.toFixed(2)}</span>}
          {user ? <span className="text-sm text-gray-300">{user}</span> : <button className="btn-primary text-sm" onClick={() => setShowAuth(true)}>Sign In</button>}
        </div>
      </div>
    </nav>
  )
}