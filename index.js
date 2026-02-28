const { Relay } = require('bedrock-protocol')
const http = require('http')

// Keep Render alive
http.createServer((req, res) => { res.write('Proxy is Online'); res.end(); }).listen(process.env.PORT || 8080)

const relay = new Relay({
  host: '0.0.0.0',
  port: 19132, // The bot's "world" port
  offline: false,
  auth: 'microsoft',
  destination: {
    host: 'NehemiahGames.aternos.me', // Your Aternos IP
    port: 17876                       // Your Aternos Port
  }
})

relay.on('connect', (player) => {
  console.log('Player joining through the bot!')
})
