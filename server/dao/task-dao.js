const Task = require('../models/task');

module.exports = {
  /**
   * Get task by id
   */
  getTaskById: async (taskId) => {
    try {
      return await Task.findOne({ _id: taskId });
    } catch (err) {
      console.error(`Repo Error (getTaskById): \n${err}`);
    }
  },

  /**
   * Get all the tasks
   */
  getAllTasks: async () => {
    try {
      return await Task.find({});
    } catch (err) {
      console.error(`Repo Error (getAllTasks): \n${err}`);
    }
  },

  /**
   * Save a new task
   */
  saveTask: async (task) => {
    try {
      return await task.save();
    } catch (err) {
      console.error(`Repo Error (saveTask): \n${err}`);
    }
  },

  /**
   * Delete a task
   */
  deleteTask: async (taskId) => {
    try {
      return await Task.findOneAndDelete({ _id: taskId });
    } catch (err) {
      console.error(`Repo Error (deleteTask): \n${err}`);
    }
  },

  /**
   * Delete all tasks
   */
  deleteAllTasks: async () => {
    try {
      return await Task.deleteMany({});
    } catch (err) {
      console.error(`Repo Error (deleteAllTasks): \n${err}`);
    }
  },
};
