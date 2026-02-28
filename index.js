const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// 1. KEEP RENDER ALIVE (Poked by UptimeRobot)
http.createServer((req, res) => { 
  res.write('Bot & Transfer World Online'); 
  res.end(); 
}).listen(process.env.PORT || 8080);

const host = 'weeverfish.aternos.host';
const port = 17876;

// 2. THE AFK BOT (Sits in Minecart to keep Aternos awake)
const bot = createClient({
  host: host,
  port: port,
  auth: 'microsoft',
  username: 'BlockBrainAI@outlook.com' // CHANGE THIS to your spare account email
});

bot.on('spawn', () => {
  console.log('AFK Bot has spawned in the Minecart!');
  
  // Anti-AFK Swing (Swings arm every 30 seconds)
  setInterval(() => {
    if (bot.entity) bot.swingArm();
  }, 30000);
});

// 3. THE TRANSFER WORLD (Shows the bot in your Friends Tab)
const relay = new Relay({
  host: '0.0.0.0',
  port: 19132,
  offline: false,
  auth: 'microsoft',
  destination: { host: host, port: port }
});

relay.on('connect', (player) => {
  console.log('You are joining through the Friends Tab! Transferring now...');
});

// Error handling to prevent crashes
bot.on('error', (err) => console.log('Bot Error:', err));
relay.on('error', (err) => console.log('Proxy Error:', err));
