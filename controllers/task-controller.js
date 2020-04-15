const KoaRouter = require('koa-router');
const TaskService = require('../services/task-service');
const taskRepo = require('../dao/task-repo');

const router = new KoaRouter();
const taskService = new TaskService(taskRepo);

/**
 * GET request for a single task by it's ID
 */
router.get('/get-task/:id', async (ctx) => {
  const taskId = ctx.params.id;
  console.log('task id', taskId);
  const task = await taskService.getTaskById(taskId);
  ctx.body = task;
});

/**
 * GET request for all tasks
 */
router.get('/get-tasks', async (ctx) => {
  const tasks = await taskService.getAllTasks();
  ctx.body = tasks;
});

/**
 * POST request to add a single task
 */
router.post('/add-task', async (ctx) => {
  const taskDto = ctx.request.body;
  console.log('task', taskDto);
  taskService.insertTask(taskDto);
  ctx.body = { message: 'Task inserted!' };
});

/**
 * PUT request to update a single task
 */
router.put('/update-task', async (ctx) => {
  const updatedTaskDto = ctx.request.body;
  console.log('updated task', updatedTaskDto);
  taskService.updateTask(updatedTaskDto);
  ctx.body = { message: 'Task updated!' };
});

/**
 * DELETE request to remove a single task
 */
router.delete('/delete-task/:id', async (ctx) => {
  const taskId = ctx.params.id;
  console.log('task id', taskId);
  taskService.deleteTask(taskId);
  ctx.body = { message: 'Task deleted!' };
});

/**
 * DELETE request to remove all tasks
 */
router.delete('/delete-all-tasks', async (ctx) => {
  taskService.deleteAllTasks();
  ctx.body = { message: 'All tasks deleted!' };
});

module.exports = router;
