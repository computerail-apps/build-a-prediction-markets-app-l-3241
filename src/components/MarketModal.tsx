import { useState } from 'react'
type Market = { id: string; title: string; category: string; yes_price: number; no_price: number; volume: number; end_date: string; description: string }
type Props = { market: Market; onClose: () => void; onTrade: (id: string, side: 'YES' | 'NO', shares: number, price: number) => void }
export default function MarketModal({ market: m, onClose, onTrade }: Props) {
  const [side, setSide] = useState<'YES' | 'NO'>('YES')
  const [shares, setShares] = useState(10)
  const price = side === 'YES' ? m.yes_price : m.no_price
  const cost = (shares * price / 100).toFixed(2)
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="card max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-bold text-base leading-snug pr-4">{m.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">×</button>
        </div>
        <p className="text-sm text-gray-400 mb-4">{m.description}</p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setSide('YES')} className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${side === 'YES' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300'}`}>YES — {m.yes_price}¢</button>
          <button onClick={() => setSide('NO')} className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${side === 'NO' ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-300'}`}>NO — {m.no_price}¢</button>
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1 block">Shares</label>
          <input type="number" min={1} max={1000} value={shares} onChange={e => setShares(+e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-400">Cost</span>
          <span className="font-semibold">${cost}</span>
        </div>
        <button onClick={() => onTrade(m.id, side, shares, price)} className={`w-full py-2.5 rounded-lg font-semibold transition ${side === 'YES' ? 'btn-yes' : 'btn-no'}`}>Buy {side} Shares</button>
      </div>
    </div>
  )
}