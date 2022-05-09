// Require mongoose
const mongoose = require('mongoose');

// Connect mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/social-network-api', {
  // Flag to use a new-style parser (as opposed to the old one) for when it parses urls
  useNewUrlParser: true,
  // Flag tells it to use unified topology setting when it runs
  useUnifiedTopology: true
});

// Export connection
module.exports = mongoose.connection;
