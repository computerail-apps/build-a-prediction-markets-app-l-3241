import { useState } from 'react'
import Navbar from './components/Navbar'
import MarketList from './components/MarketList'
import MarketModal from './components/MarketModal'
import Portfolio from './components/Portfolio'
import AuthModal from './components/AuthModal'
import { DEMO_MARKETS } from './lib/markets'
import type { Market } from './lib/supabase'

export type Position = { marketId: string; side: 'YES' | 'NO'; shares: number; price: number }

export default function App() {
  const [tab, setTab] = useState<'markets' | 'portfolio'>('markets')
  const [selected, setSelected] = useState<(typeof DEMO_MARKETS)[0] | null>(null)
  const [positions, setPositions] = useState<Position[]>([])
  const [balance, setBalance] = useState(1000)
  const [user, setUser] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = DEMO_MARKETS.filter(m =>
    (category === 'All' || m.category === category) &&
    m.title.toLowerCase().includes(search.toLowerCase())
  )

  function handleTrade(marketId: string, side: 'YES' | 'NO', shares: number, price: number) {
    if (!user) { setShowAuth(true); return }
    const cost = shares * (price / 100)
    if (cost > balance) return alert('Insufficient balance')
    setBalance(b => +(b - cost).toFixed(2))
    setPositions(p => {
      const ex = p.find(x => x.marketId === marketId && x.side === side)
      if (ex) return p.map(x => x.marketId === marketId && x.side === side ? { ...x, shares: x.shares + shares } : x)
      return [...p, { marketId, side, shares, price }]
    })
    setSelected(null)
  }

  return (
    <div className="min-h-screen">
      <Navbar tab={tab} setTab={setTab} user={user} setShowAuth={setShowAuth} balance={balance} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {tab === 'markets' && <MarketList markets={filtered} search={search} setSearch={setSearch} category={category} setCategory={setCategory} onSelect={setSelected} />}
        {tab === 'portfolio' && <Portfolio positions={positions} markets={DEMO_MARKETS} balance={balance} />}
      </main>
      {selected && <MarketModal market={selected} onClose={() => setSelected(null)} onTrade={handleTrade} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={setUser} />}
    </div>
  )
}