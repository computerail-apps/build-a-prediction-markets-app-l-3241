type Market = { id: string; title: string; category: string; yes_price: number; no_price: number; volume: number; end_date: string; resolved: boolean; outcome: string | null; description: string }
type Props = { market: Market; onSelect: (m: Market) => void }
export default function MarketCard({ market: m, onSelect }: Props) {
  return (
    <div className="card cursor-pointer hover:border-indigo-700 transition" onClick={() => onSelect(m)}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">{m.category}</span>
        <span className="text-xs text-gray-500">Ends {m.end_date}</span>
      </div>
      <h3 className="font-semibold text-sm mb-4 leading-snug">{m.title}</h3>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>YES {m.yes_price}¢</span><span>NO {m.no_price}¢</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${m.yes_price}%` }} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Vol: ${(m.volume / 1000).toFixed(0)}K</span>
        <div className="flex gap-2">
          <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded">YES {m.yes_price}%</span>
          <span className="text-xs bg-rose-900/50 text-rose-400 px-2 py-0.5 rounded">NO {m.no_price}%</span>
        </div>
      </div>
    </div>
  )
}