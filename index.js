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
    connectTimeout: 300000k
  }
});

relay.on('connect', (player) => {
  console.log('You joined through the Friends Tab! Transferring to Aternos...');
});

// Error handling to prevent the "Exited Early" crash
bot.on('error', (err) => console.log('Bot Error:', err));
relay.on('error', (err) => console.log('Proxy Error:', err));
// 4. ADMIN COMMANDS (Only works for YOU)
const myGamertag = 'YOUR_ACTUAL_GAMERTAG'; // Replace with your real name!

bot.on('chat', (packet) => {
  const message = packet.message;
  const sender = packet.source_name;

  if (sender === myGamertag) {
    if (message === '!stop') {
      bot.queue('text', { message: 'Shutting down bot. Goodbye!' });
      setTimeout(() => { process.exit(0) }, 2000);
    }
    
    if (message === '!reboot') {
      bot.queue('text', { message: 'Rebooting systems...' });
      setTimeout(() => { process.exit(1) }, 2000); // Render will auto-restart it
    }
    
    if (message === '!status') {
      bot.queue('text', { message: 'I am online and 24/7 thanks to Render!' });
    }
  }
});
