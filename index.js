import login from 'facebook-chat-api'
import fetch from 'node-fetch'

import fs from 'fs'

const HISTORY_URL = 'http://mockbin.org/bin/8a2b1956-215f-4f83-8e2f-57bf0ff25807'
const THREAD_ID = '4026672720681638'

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, { forceLogin: true, selfListen: true }, (err, api) => {
  if (err) return console.error(err)

  api.listenMqtt((err, message) => {
    if (err) return console.error(err)

    if (message.type !== 'message' || message.threadID !== THREAD_ID) {
      return
    }

    fetch(HISTORY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    })

    console.log(message)
  })
})
