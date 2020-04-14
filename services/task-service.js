class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async getAllTasks() {
    const tasks = await this.taskRepo.getAllTasks();
    console.log('tasks', tasks);
    if (tasks.length === 0) console.log('No tasks found in database.');
    return tasks;
  }

  insertTask() {
    this.taskRepo.insertTask();
  }

  deleteTask() {
    this.taskRepo.deleteTask();
  }

  deleteAllTasks() {
    this.taskRepo.deleteAllTasks();
  }
}

module.exports = TaskService;
