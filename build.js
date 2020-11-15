import login from 'facebook-chat-api'

import fs from 'fs'

const USER = process.env.USER
const PASS = process.env.PASS

login({ email: USER, password: PASS }, { forceLogin: true }, (err, api) => {
  if (err) return console.error(err)

  fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()))
})
