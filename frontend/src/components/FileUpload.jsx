import { useState } from "react"
import axios from "axios"

const API = "http://localhost:8000"

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("")

  const upload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)

    await axios.post(`${API}/upload`, formData)
    setStatus("Uploaded")
  }

  return (
    <div className="flex items-center gap-2">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload} className="bg-accent px-3 py-1 rounded">
        Upload
      </button>
      <span className="text-xs text-slate-400">{status}</span>
    </div>
  )
}
