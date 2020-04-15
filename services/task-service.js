const { createTask } = require('../util/task-util');

class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async getTaskById(taskId) {
    const task = await this.taskRepo.getTaskById(taskId);
    if (!task) console.log('No task found');
    return task;
  }

  async getAllTasks() {
    const tasks = await this.taskRepo.getAllTasks();
    if (tasks.length === 0) console.log('No tasks found in database.');
    return tasks;
  }

  insertTask(taskDto) {
    const task = createTask(taskDto);
    this.taskRepo.insertTask(task);
  }

  deleteTask(taskId) {
    this.taskRepo.deleteTask(taskId);
  }

  deleteAllTasks() {
    this.taskRepo.deleteAllTasks();
  }
}

module.exports = TaskService;
