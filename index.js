const { createClient } = require('bedrock-protocol');
const http = require('http');

// 1. SETTINGS - UPDATE THESE FROM ATERNOS "CONNECT" BUTTON
const aternosHost = 'paddlefish.aternos.host'; 
const aternosPort = 17876; 

// Keep Render Alive
http.createServer((req, res) => { res.write('AFK Bot Online'); res.end(); }).listen(process.env.PORT || 8080); 

// 2. THE AFK BOT (BlockBrainAI)
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
    console.log('AFK BOT: Spawned in the Minecart!');
    setInterval(() => { if (bot.entity) bot.swingArm(); }, 30000);
  });

  bot.on('error', (err) => console.log('Bot Error:', err));
  
  bot.on('close', () => {
    console.log('Bot disconnected. Reconnecting in 10s...');
    setTimeout(startBot, 10000);
  });
}

startBot();
