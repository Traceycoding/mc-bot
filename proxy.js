const { Relay } = require('bedrock-protocol');
const http = require('http');

// 1. SETTINGS
const aternosHost = 'borador.aternos.host'; 
const aternosPort = 17876; 

// Keep Render Alive
http.createServer((req, res) => { res.write('Proxy Online'); res.end(); }).listen(process.env.PORT || 8080); 

// 2. THE TRANSFER WORLD (NGjoinbot)
const relay = new Relay({
  host: '0.0.0.0',
  port: 19132,
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

relay.on('connect', (p) => console.log('Player joining via Friends Tab!'));
relay.on('error', (err) => console.log('Proxy Error:', err));
