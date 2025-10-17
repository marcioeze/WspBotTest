// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodiess
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = 'EAASPLTqij1IBPoRaq15ZBSggAkfq4BadUU5Twb1xH2BPO4frkZCmbNYILvX9KZCQST6nQfQuT21hKpOm31BHzINps1R5mWLgJkr5LQvgj9ZCjxNsgOKn0EvKidyL6NZAGBgzkgW0gjfxEZCBZADCq3dChmoua0duD5WcpidEBZCCZA5oUGxuoIgROeFrsM8jNjq6WOKij6aTZCCtA6tnl1U2r06sjvutbQh4qBEJpmemU8EGa3IgZDZD'

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});