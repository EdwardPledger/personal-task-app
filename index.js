const ServerConfiguration = require('./config/server');
const DatabaseConfiguration = require('./config/db');
const koaApp = require('./config/app');

const portNumber = 3000;
const url = 'mongodb://localhost/TaskApp';

// Start the server
const koaServer = new ServerConfiguration(koaApp, portNumber);

// Connect to database
const taskDatabase = new DatabaseConfiguration(url);
taskDatabase.validateConnectionToDatabase();

// For testing purposes
module.exports = {
  serverInstance: koaServer,
  dbInstance: taskDatabase,
};
