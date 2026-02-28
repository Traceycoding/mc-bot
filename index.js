const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// 1. SETTINGS (MUST BE AT THE TOP)
// Double-check these on your Aternos "Connect" button!
const aternosHost = 'borador.aternos.host'; 
const aternosPort = 17876; 
const mcpport = 19132;
const spareEmail = 'BlockBrainAI@outlook.com'; // Put your bot email here!

// 2. KEEP RENDER ALIVE
http.createServer((req, res) => { 
  res.write('Bot & Proxy Online'); 
  res.end(); 
}).listen(mcpport); 

// 3. THE AFK BOT (Stays in Minecart)
const bot = createClient({
  host: aternosHost,
  port: aternosPort,
  auth: 'microsoft',
  username: spareEmail,
  skipPing: true,
  connectTimeout: 300000,
  profilesFolder: './auth' // Remembers your login!
});

bot.on('spawn', () => {
  console.log('AFK Bot has spawned in the Minecart!');
  // Anti-AFK Swing
  setInterval(() => { if (bot.entity) bot.swingArm(); }, 30000);
});

// 4. THE TRANSFER WORLD (Friends Tab Proxy)
const relay = new Relay({
  host: '0.0.0.0',
  port: mcpport,
  offline: false,
  auth: 'microsoft',
  profilesFolder: './auth',
  announcement: {
    Motd: "Bot's Transfer World",
    ServerVisibility: 1 
  },
  destination: { 
    host: aternosHost, 
    port: aternosPort,
    skipPing: true,
    connectTimeout: 300000
  }
});

relay.on('connect', (player) => {
  console.log('Player joining through the Friends Tab! Transferring...');
});

// Error handling to prevent "Application Exited Early"
bot.on('error', (err) => console.log('Bot Error:', err));
relay.on('error', (err) => console.log('Proxy Error:', err));

// Auto-Restart if Aternos kicks the bot
bot.on('close', () => {
  console.log('Disconnected from Aternos. Restarting...');
  process.exit(1);
});
