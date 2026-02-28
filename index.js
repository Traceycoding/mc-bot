const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// 1. SETTINGS
const aternosHost = 'borador.aternos.host'; 
const aternosPort = 17876; 
const mcpport = 19132;

// 2. KEEP RENDER ALIVE
http.createServer((req, res) => { res.write('Dual Bot Online'); res.end(); }).listen(mcpport); 

// 3. THE AFK BOT (Account #1 - Sits in Minecart)
const bot = createClient({
  host: aternosHost,
  port: aternosPort,
  auth: 'microsoft',
  username: 'BlockBrainAI@outlook.com', // <--- FIRST SPARE EMAIL
  skipPing: true,
  profilesFolder: './auth/bot' // Saves login for Bot #1
});

bot.on('spawn', () => console.log('AFK Bot (Account 1) is in the Minecart!'));

// 4. THE TRANSFER WORLD (Account #2 - Shows in Friends Tab)
const relay = new Relay({
  host: '0.0.0.0',
  port: mcpport,
  offline: false,
  auth: 'microsoft',
  username: 'NGjoinbot@outlook.com', // <--- SECOND SPARE EMAIL
  profilesFolder: './auth/proxy', // Saves login for Bot #2
  announcement: {
    Motd: "Server Transfer World",
    ServerVisibility: 1 
  },
  destination: { host: aternosHost, port: aternosPort, skipPing: true }
});

relay.on('connect', (player) => console.log('Player transferring via Account 2!'));
