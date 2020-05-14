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

const crudDao = require('./dao/crud-dao');
const Task = require('./models/task');

// crudDao.getObjectById('Task', '5ebafa46c8ae8930086bb079').then(task => {
//     console.log('task', task);
// });

// crudDao.insertObject('Task', { name: 'test test test' }).then(task => {
//   console.log('task', task);
  
// })

// crudDao.getObjects('Task').then(data => {
//   console.log('data', data);
  
// })

// For testing purposes
module.exports = {
  serverInstance: koaServer,
  dbInstance: taskDatabase,
};
