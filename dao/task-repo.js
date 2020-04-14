const Task = require('../models/task');

/**
 * Get all the tasks
 */
exports.getAllTasks = () => {
  Task.find({}, (err, docs) => {
    if (!err) {
      return docs;
    }
    // Return an empty array if error occurs
    console.error(`Repo Error (getAllTasks): \n${err}`);
    return [];
  });
};

/**
 * Insert a new task
 */
exports.insertTask = (task) => {
  task.save((err, doc) => {
    if (err) {
      console.error(`Repo Error (insertTask): \n${err}`);
    }
    console.log(`Successfully inserted new task: \n${doc}`);
  });
};


/**
 * Delete a task
 */
exports.deleteTask = (taskId) => {
  Task.deleteOne({ _id: taskId }, (err) => {
    console.error(`Repo Error (deleteTask): \n${err}`);
  });
};

/**
 * Delete all tasks
 */
exports.deleteAllTasks = () => {
  Task.deleteMany({}, (err) => {
    console.error(`Repo Error (deleteAllTasks): \n${err}`);
  });
};
