const { createTask, createUpdateTask } = require('../util/task-util');

class TaskService {
  // Constructor used for dependency injection (sort of, but not really)
  constructor(dao) {
    this.dao = dao;
  }

  async getTaskById(taskId) {
    const task = await this.dao.getObjectById('Task', taskId);
    if (!task) console.log('No task found');
    return task;
  }

  async getAllTasks() {
    const tasks = await this.dao.getObjects('Task');
    if (tasks.length === 0) console.log('No tasks found in database.');
    return tasks;
  }

  async insertTask(taskDto) {
    // const task = createTask(taskDto);
    return await this.dao.insertObject('Task', taskDto);
  }

  async updateTask(updatedTaskDto) {
    // const updatedTask = createUpdateTask(updatedTaskDto);
    return await this.dao.updateObject('Task', updatedTaskDto);
  }

  async deleteTask(taskId) {
    return await this.dao.deleteObjectById('Task', taskId);
  }

  async deleteAllTasks() {
    return await this.dao.deleteObjects('Task');
  }
}

module.exports = TaskService;
