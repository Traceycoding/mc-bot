const { createClient, Relay } = require('bedrock-protocol');
const http = require('http');

// ... rest of your code
const bot = createClient({
  host: aternosHost,
  port: aternosPort,
  auth: 'microsoft',
  username: 'YOUR_SPARE_EMAIL@outlook.com',
  skipPing: true,
  connectTimeout: 300000,
  profilesFolder: './auth' // <--- ADD THIS LINE HERE
});

// AND look for this part:
const relay = new Relay({
  host: '0.0.0.0',
  port: mcpport,
  offline: false,
  auth: 'microsoft',
  profilesFolder: './auth', // <--- ADD THIS LINE HERE TOO
  destination: { 
    host: aternosHost, 
    port: aternosPort,
    skipPing: true,
    connectTimeout: 300000
  }
});
