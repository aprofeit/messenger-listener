import login from 'facebook-chat-api'
import fetch from 'node-fetch'

import fs from 'fs'

const HISTORY_URL = 'http://mockbin.org/bin/8a2b1956-215f-4f83-8e2f-57bf0ff25807'

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, { forceLogin: true, selfListen: true }, (err, api) => {
  if (err) return console.error(err)

  api.getFriendsList((err, data) => {
    if (err) return console.error(err)

    fs.writeFileSync('friendslist.json', JSON.stringify(api.getAppState()))
  })

  api.listenMqtt((err, message) => {
    if (err) return console.error(err)

    if (message.type !== 'message') {
      return
    }

    fetch(HISTORY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message.body)
    })

    console.log(message)
  })
})
