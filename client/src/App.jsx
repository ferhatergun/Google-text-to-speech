import { useState } from "react"

function App() {
  const [text, setText] = useState("")
  const [audioSrc, setAudioSrc] = useState(null)

  const handleSpeak = async () => {
    try {
      const response = await fetch("http://localhost:5000/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })
      const result = await response.json()
      console.log(result)
      const audioSrc = `data:audio/mp3;base64,${result.audioContent}`
      setAudioSrc(audioSrc)
   
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error)
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h2>Text To Speech</h2>
        <textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={handleSpeak}>Speak It</button>
        {
          audioSrc && <audio controls src={audioSrc} />
        }
      </div>


    </div>
  )
}

export default App
