const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// 1. FORCED PORT 19132 (This makes it show up in Friends Tab without Variables)
const mcpport = 19132;

// Keep Render Alive
http.createServer((req, res) => { 
  res.write('Bot & Transfer World Online'); 
  res.end(); 
}).listen(mcpport); 

// YOUR ATERNOS INFO (Double-check the "Connect" button on Aternos!)
const aternosHost = 'tubeshoulder.aternos.host'; 
const aternosPort = 17876; 

// 2. THE AFK BOT (Stays in Minecart to keep Aternos awake)
const bot = createClient({
  host: aternosHost,
  port: aternosPort,
  auth: 'microsoft',
  username: 'BlockBrainAI@outlook.com', // <--- YOUR SPARE EMAIL HERE
  skipPing: true,
  connectTimeout: 300000, 
  profilesFolder: './controls'
});

bot.on('spawn', () => {
  console.log('AFK Bot has spawned in the Minecart!');
  // Anti-AFK Swing
  setInterval(() => { if (bot.entity) bot.swingArm(); }, 30000);
});

// 3. THE TRANSFER WORLD (The part you see in the Friends Tab)
const relay = new Relay({
  host: '0.0.0.0',
  port: mcpport,
  offline: false,
  auth: 'microsoft',
  announcement: {
    Motd: "Bot's Transfer World",
    ServerVisibility: 1 // 1 = Visible to Friends
  },
  destination: { 
    host: aternosHost, 
    port: aternosPort,
    skipPing: true,
    connectTimeout: 300000
  }
});

relay.on('connect', (player) => {
  console.log('You joined through the Friends Tab! Transferring to Aternos...');
});

// Error handling to prevent the "Exited Early" crash
bot.on('error', (err) => console.log('Bot Error:', err));
relay.on('error', (err) => console.log('Proxy Error:', err));
