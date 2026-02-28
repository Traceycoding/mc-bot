const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// 1. SETTINGS
const aternosHost = 'borador.aternos.host'; 
const aternosPort = 17876; 
const mcpport = 19132;

// Keep Render Alive
http.createServer((req, res) => { res.write('Dual Bot System Online'); res.end(); }).listen(mcpport); 

// 2. THE AFK BOT (Account #1 - BlockBrainAI)
function startBot() {
  const bot = createClient({
    host: aternosHost,
    port: aternosPort,
    auth: 'microsoft',
    username: 'BlockBrainAI@outlook.com', 
    skipPing: true,
    profilesFolder: './auth/bot'
  });

  bot.on('spawn', () => {
    console.log('BOT 1 (BlockBrainAI): Spawned in the Minecart!');
    setInterval(() => { if (bot.entity) bot.swingArm(); }, 30000);
  });
  bot.on('error', (err) => console.log('Bot 1 Error:', err));
  bot.on('close', () => setTimeout(startBot, 10000)); 
}

// 3. THE TRANSFER WORLD (Account #2 - NGjoinbot)
const relay = new Relay({
  host: '0.0.0.0',
  port: mcpport,
  offline: false,
  auth: 'microsoft',
  username: 'NGjoinbot@outlook.com',
  profilesFolder: './auth/proxy',
  announcement: { 
    Motd: "NG Server Joiner", 
    ServerVisibility: 1 
  },
  destination: { host: aternosHost, port: aternosPort, skipPing: true }
});

relay.on('connect', (p) => console.log('Player joining via NGjoinbot!'));
relay.on('error', (err) => console.log('Proxy Error:', err));

startBot(); // Launches BlockBrainAI
