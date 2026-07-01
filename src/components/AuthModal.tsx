import { useState } from 'react'
type Props = { onClose: () => void; onAuth: (u: string) => void }
export default function AuthModal({ onClose, onAuth }: Props) {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [mode, setMode] = useState<'in' | 'up'>('in')
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !pw) return
    onAuth(email)
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="card max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">{mode === 'in' ? 'Sign In' : 'Create Account'}</h2>
        <form onSubmit={submit} className="space-y-3">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
          <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500" />
          <button type="submit" className="btn-primary w-full">{mode === 'in' ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-3">
          {mode === 'in' ? "Don't have an account? " : 'Already have one? '}
          <button className="text-indigo-400 hover:underline" onClick={() => setMode(mode === 'in' ? 'up' : 'in')}>{mode === 'in' ? 'Sign Up' : 'Sign In'}</button>
        </p>
      </div>
    </div>
  )
}