class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  getAllTasks() {
    const tasks = this.taskRepo.getAllTasks();
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
