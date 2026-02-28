const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// 1. KEEP RENDER ALIVE
http.createServer((req, res) => { 
  res.write('Bot & Proxy Online'); 
  res.end(); 
}).listen(process.env.PORT || 8080);

// CHANGE THESE to match your Aternos "Connect" info exactly!
const aternosHost = 'weeverfish.aternos.host'; 
const aternosPort = 17876; 

// 2. THE AFK BOT (Stays in Minecart)
const bot = createClient({
  host: aternosHost,
  port: aternosPort,
  auth: 'microsoft',
  username: 'BlockBrainAI@outlook.com', // Your spare email
  skipPing: true, // Fixes the timeout error
  profilesFolder: './controls'
});

bot.on('spawn', () => {
  console.log('AFK Bot is in the Minecart!');
  setInterval(() => { if (bot.entity) bot.swingArm(); }, 30000);
});

// 3. THE TRANSFER WORLD (Friends Tab Proxy)
const relay = new Relay({
  host: '0.0.0.0',
  port: 19132,
  offline: false,
  auth: 'microsoft',
  destination: { 
    host: aternosHost, 
    port: aternosPort,
    skipPing: true // Fixes the timeout error here too
  }
});

relay.on('connect', (player) => {
  console.log('Player joining through the Friends Tab! Transferring...');
});

// Basic Error Handling
bot.on('error', (err) => console.log('Bot Error:', err));
relay.on('error', (err) => console.log('Proxy Error:', err));
