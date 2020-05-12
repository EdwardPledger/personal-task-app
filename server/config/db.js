const mongoose = require('mongoose');

/**
 * Database configuration
 */
class DatabaseConfiguration {
  constructor(url) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    this.url = url;
    this.db = mongoose.connection;
  }

  validateConnectionToDatabase() {
    this.db.once('open', () => console.log(`Database connected: ${this.url}...`));
    this.db.on('error', (error) => console.log(`Connection error: ${error}...`));
  }

  closeDatabase() {
    this.db.close();
  }
}

module.exports = DatabaseConfiguration;
