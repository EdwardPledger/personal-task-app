const Task = require('./models/task');
const startServer = require('./config/server');
const DatabaseConfiguration = require('./config/db');

const url = 'mongodb://localhost/TaskApp';

// Start the server
startServer();

// Connect to database
const taskDatabase = new DatabaseConfiguration(url);
taskDatabase.validateConnectionToDatabase();

/**
 * Test code
 */
const test = new Task({
  name: 'NODE TEST',
  description: 'NODE DESCRIPTION',
});

test.save((error, document) => {
  if (error) console.error(error);
  console.log(document);
});
