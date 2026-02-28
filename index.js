const bedrock = require('bedrock-protocol');
const http = require('http');

// Keep-alive server for Render
http.createServer((req, res) => {
  res.write('Bot is online!');
  res.end();
}).listen(process.env.PORT || 8080);

const bot = bedrock.createClient({
  host: 'YOUR_SERVER_IP', // Change to your server IP
  port: 19132,            // Change if your port is different
  auth: 'microsoft'       // This makes it show up in the Friends Tab
});

bot.on('spawn', () => {
  console.log('Bot joined! Check the console for the Microsoft code.');
});

// Error handling so the bot doesn't crash
bot.on('error', (err) => console.log('Error:', err));
