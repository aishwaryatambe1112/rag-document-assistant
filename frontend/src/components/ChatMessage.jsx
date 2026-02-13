import { motion } from "framer-motion"

export default function ChatMessage({ role, text, sources }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-2xl p-4 rounded-2xl whitespace-pre-wrap ${
        role === "user"
          ? "ml-auto bg-accent"
          : "bg-slate-800"
      }`}
    >
      <div>{text}</div>
      {sources && (
        <div className="text-xs text-slate-400 mt-2">
          Sources: {sources.join(", ")}
        </div>
      )}
    </motion.div>
  )
}

