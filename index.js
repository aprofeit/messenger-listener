import login from 'facebook-chat-api'
import fetch from 'node-fetch'

import fs from 'fs'

const HISTORY_URL = process.env.HISTORY_URL || 'http://localhost:3000/messages'
const ALLOWED_THREAD_IDS = ['4026672720681638', '100057382012154', '503003510']

login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, { forceLogin: true, selfListen: true, autoMarkRead: true }, (err, api) => {
  if (err) return console.error(err)

  api.markAsReadAll()
  api.listenMqtt((err, message) => {
    if (err) return console.error(err)

    console.log(message.threadID)
    if (!ALLOWED_THREAD_IDS.includes(message.threadID)) {
      return
    }

    if (message.type !== 'message') {
      return
    }

    console.log(message.body)
    fetch(HISTORY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    })
  })
})
