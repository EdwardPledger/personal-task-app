const NotFoundError = require('../errors/not-found-error');

class TaskService {
  // Constructor used for dependency injection (sort of, but not really)
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Get a task by it's id
   * @param {*} taskId - id of task
   */
  async getTaskById(taskId) {
    const task = await this.dao.getObjectById('Task', taskId);
    
    if (!task) {
      throw new NotFoundError('No task found with the id provided.', 'getTaskById', 'Task', taskId);
    }
    return task;
  }

  /**
   * Get all tasks
   */
  async getAllTasks() {
    const tasks = await this.dao.getObjects('Task');

    if (tasks.length === 0) console.log('No tasks found in database.');
    
    return tasks;
  }

  /**
   * Insert a new task
   * @param {*} taskDto task object
   */
  async insertTask(taskDto) {
    return await this.dao.insertObject('Task', taskDto);
  }

  /**
   * Update an existing task
   * @param {*} updatedTaskDto task object
   */
  async updateTask(updatedTaskDto) {
    return await this.dao.updateObject('Task', updatedTaskDto);
  }

  /**
   * Delete an existing task by it's id
   * @param {*} taskId id of task
   */
  async deleteTaskById(taskId) {
    const task = await this.dao.deleteObjectById('Task', taskId);
    
    if (!task) {
      throw new NotFoundError('No task found with the id provided.', 'deleteTaskById', 'Task', taskId);
    }

    return task;
  }

  /**
   * Delete all tasks
   */
  async deleteAllTasks() {
    return await this.dao.deleteObjects('Task');
  }
}

module.exports = TaskService;
