const Task = require('../models/task');

module.exports = {
  /**
   * Get task by id
   */
  getTaskById: async (taskId) => {
    let task;
    try {
      task = await Task.findOne({ _id: taskId });
      console.log(`Succesfully found task: \n${task}`);
    } catch (err) {
      console.error(`Repo Error (getTaskById): \n${err}`);
    }
    return task;
  },

  /**
   * Get all the tasks
   */
  getAllTasks: async () => {
    let tasks;
    try {
      tasks = await Task.find({});
    } catch (err) {
      console.error(`Repo Error (getAllTasks): \n${err}`);
    }
    return tasks;
  },
  /**
   * Save a new task
   */
  saveTask: async (task) => {
    try {
      await task.save();
      console.log(`Successfully saved task: \n${task}`);
    } catch (err) {
      console.error(`Repo Error (saveTask): \n${err}`);
    }
  },

  /**
   * Delete a task
   */
  deleteTask: async (taskId) => {
    try {
      const task = await Task.findOneAndDelete({ _id: taskId });
      console.log(`Successfully deleted task: \n${task}`);
    } catch (err) {
      console.error(`Repo Error (deleteTask): \n${err}`);
    }
  },

  /**
   * Delete all tasks
   */
  deleteAllTasks: async () => {
    try {
      await Task.deleteMany({});
      console.log('Successfully deleted all tasks!');
    } catch (err) {
      console.error(`Repo Error (deleteAllTasks): \n${err}`);
    }
  },
};
