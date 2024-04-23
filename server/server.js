const express = require("express")
const axios = require("axios")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.post("/tts", async (req, res) => {
    const { text } = req.body
    const apiKey = process.env.CLOUD_API_KEY
    const endpoint =`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`
    const payload = {
        "audioConfig": {
          "audioEncoding": "MP3",
          "pitch": 0,
          "speakingRate": 1
        },
        "input": {
          "text": text
        },
        "voice": {
          "languageCode": "en-US",
          "name": "en-US-Polyglot-1"
        }
      }

    const response = await axios.post(endpoint, payload)
    res.json(response.data)
})

const port = 5002
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})