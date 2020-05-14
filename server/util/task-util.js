const Task = require('../models/task');

module.exports.createTask = (taskDto) => {
  console.log('taskdto', taskDto);
  const task = new Task();
  task.name = taskDto.name;
  task.description = taskDto.description;
  task.estimatedTime = taskDto.estimatedTime ? taskDto.estimatedTime : 0;
  console.log('task', task);
  
  return task;
};

module.exports.createUpdateTask = (updatedTaskDto) => {
  const updatedTask = this.createTask(updatedTaskDto);
  // eslint-disable-next-line no-underscore-dangle
  updatedTask._id = updatedTaskDto._id; // Use id of task to be updated
  updatedTask.isNew = false;
  updatedTask.actualTime = updatedTaskDto.actualTime;
  updatedTask.taskState = updatedTaskDto.taskState;
  console.log('udpated task util', updatedTask);

  return updatedTask;
};
