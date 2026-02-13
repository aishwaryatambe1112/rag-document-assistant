import { useState } from "react"
import axios from "axios"
import Header from "./components/Header"
import ChatMessage from "./components/ChatMessage"
import ChatInput from "./components/ChatInput"
import FileUpload from "./components/FileUpload"

const API = "http://localhost:8000"

export default function App() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text) => {
    const userMsg = { role: "user", text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await axios.post(`${API}/ask`, { question: text })
      const botMsg = {
        role: "bot",
        text: res.data.answer,
        sources: res.data.sources
      }
      setMessages(prev => [...prev, botMsg])
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", text: "API error" }])
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="p-3 border-b border-slate-800 bg-panel">
        <FileUpload />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        {loading && (
          <div className="text-slate-400">Thinking...</div>
        )}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  )
}

