const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// 1. KEEP RENDER ALIVE
http.createServer((req, res) => { res.write('Bot & Proxy Online'); res.end(); }).listen(process.env.PORT || 8080);

const aternosHost = 'weeverfish.aternos.host'; 
const aternosPort = 17876; 

// 2. THE AFK BOT (With 5-minute login timer)
const bot = createClient({
  host: aternosHost,
  port: aternosPort,
  auth: 'microsoft',
  username: 'BlockBrainAI@outlook.com',
  skipPing: true,
  connectTimeout: 300000, // <--- THIS GIVES YOU 5 MINUTES TO TYPE THE CODE
  profilesFolder: './controls'
});

bot.on('spawn', () => {
  console.log('AFK Bot has spawned! You made it!');
  setInterval(() => { if (bot.entity) bot.swingArm(); }, 30000);
});

// 3. THE TRANSFER WORLD (With 5-minute login timer)
const relay = new Relay({
  host: '0.0.0.0',
  port: 19132,
  offline: false,
  auth: 'microsoft',
  destination: { 
    host: aternosHost, 
    port: aternosPort,
    skipPing: true,
    connectTimeout: 300000 // <--- ADD THIS HERE TOO
  }
});

// Error handling to stop the "Exited Early" crash
bot.on('error', (err) => console.log('Bot Error:', err));
relay.on('error', (err) => console.log('Proxy Error:', err));
