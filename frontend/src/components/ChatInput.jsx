import { useState } from "react"

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("")

  const send = () => {
    if (!value.trim()) return
    onSend(value)
    setValue("")
  }

  return (
    <div className="p-4 border-t border-slate-800 flex gap-2 bg-panel">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Ask about your documents..."
        className="flex-1 bg-slate-900 p-3 rounded-xl outline-none"
        onKeyDown={e => e.key === "Enter" && send()}
      />
      <button
        onClick={send}
        className="bg-accent px-6 rounded-xl"
      >
        Send
      </button>
    </div>
  )
}
