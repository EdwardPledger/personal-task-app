const Task = require('../models/task');


module.exports.createTask = (taskDto) => {
  const task = new Task();
  task.actualTime = taskDto.actualTime;
  task.taskState = taskDto.taskState;
  task.name = taskDto.name;
  task.description = taskDto.description;
  task.estimatedTime = taskDto.estimatedTime;

  return task;
};
