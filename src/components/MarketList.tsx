import MarketCard from './MarketCard'
const CATS = ['All', 'Crypto', 'Finance', 'AI', 'Space']
type Market = { id: string; title: string; category: string; yes_price: number; no_price: number; volume: number; end_date: string; resolved: boolean; outcome: string | null; description: string }
type Props = { markets: Market[]; search: string; setSearch: (s: string) => void; category: string; setCategory: (c: string) => void; onSelect: (m: Market) => void }
export default function MarketList({ markets, search, setSearch, category, setCategory, onSelect }: Props) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Prediction Markets</h1>
        <p className="text-gray-400 text-sm">Trade on real-world outcomes. Buy YES or NO shares.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search markets..." className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm flex-1 outline-none focus:border-indigo-500" />
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c => <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${category === c ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>{c}</button>)}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {markets.map(m => <MarketCard key={m.id} market={m} onSelect={onSelect} />)}
      </div>
      {markets.length === 0 && <p className="text-center text-gray-500 py-16">No markets found.</p>}
    </div>
  )
}