const { startServer } = require('./config/server');
const DatabaseConfiguration = require('./config/db');

const url = 'mongodb://localhost/TaskApp';

// Start the server
startServer();

// Connect to database
const taskDatabase = new DatabaseConfiguration(url);
taskDatabase.validateConnectionToDatabase();
