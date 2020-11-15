const login = require('facebook-chat-api')

const USER = 'aprofeit@mac.com'
const PASS = 'YgaV$HnR878Xwt9$#)'

login({email: USER, password: PASS}, (err, api) => {
  if(err) return console.error(err);

  api.listenMqtt((err, message) => {
    console.log(message)
    console.log(`Message from ${message.threadID}: ${message.body}`)
  });
});
