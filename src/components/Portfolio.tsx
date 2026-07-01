import type { Position } from '../App'
type Market = { id: string; title: string; yes_price: number; no_price: number }
type Props = { positions: Position[]; markets: Market[]; balance: number }
export default function Portfolio({ positions, markets, balance }: Props) {
  const total = positions.reduce((s, p) => {
    const m = markets.find(x => x.id === p.marketId)
    if (!m) return s
    const cur = p.side === 'YES' ? m.yes_price : m.no_price
    return s + p.shares * cur / 100
  }, 0)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="card"><p className="text-xs text-gray-400 mb-1">Cash Balance</p><p className="text-xl font-bold text-emerald-400">${balance.toFixed(2)}</p></div>
        <div className="card"><p className="text-xs text-gray-400 mb-1">Positions Value</p><p className="text-xl font-bold">${total.toFixed(2)}</p></div>
        <div className="card"><p className="text-xs text-gray-400 mb-1">Open Positions</p><p className="text-xl font-bold">{positions.length}</p></div>
      </div>
      {positions.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No positions yet. Start trading!</div>
      ) : (
        <div className="space-y-3">
          {positions.map((p, i) => {
            const m = markets.find(x => x.id === p.marketId)
            if (!m) return null
            const cur = p.side === 'YES' ? m.yes_price : m.no_price
            const val = (p.shares * cur / 100).toFixed(2)
            return (
              <div key={i} className="card flex items-center justify-between">
                <div><p className="text-sm font-medium">{m.title}</p><p className="text-xs text-gray-400 mt-0.5">{p.shares} shares · Avg {p.price}¢</p></div>
                <div className="text-right"><span className={`text-sm font-bold px-2 py-0.5 rounded ${p.side === 'YES' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-rose-900/50 text-rose-400'}`}>{p.side}</span><p className="text-sm font-semibold mt-1">${val}</p></div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}