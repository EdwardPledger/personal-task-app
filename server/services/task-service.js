const { createTask, createUpdateTask } = require('../util/task-util');

class TaskService {
  // Constructor used for dependency injection (sort of, but not really)
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

  async insertTask(taskDto) {
    const task = createTask(taskDto);
    return await this.taskRepo.saveTask(task);
  }

  async updateTask(updatedTaskDto) {
    const updatedTask = createUpdateTask(updatedTaskDto);
    return await this.taskRepo.saveTask(updatedTask);
  }

  async deleteTask(taskId) {
    return await this.taskRepo.deleteTask(taskId);
  }

  async deleteAllTasks() {
    return await this.taskRepo.deleteAllTasks();
  }
}

module.exports = TaskService;
