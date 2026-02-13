export default function Header() {
  return (
    <div className="p-4 border-b border-slate-800 bg-panel flex justify-between items-center">
      <h1 className="text-lg font-semibold">RAG Document Assistant</h1>
      <div className="text-xs text-slate-400">LLM + Vector DB</div>
    </div>
  )
}

