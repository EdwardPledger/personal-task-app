const KoaRouter = require('koa-router');
const TaskService = require('../services/task-service');
const taskRepo = require('../dao/task-repo');

const router = new KoaRouter();
const taskService = new TaskService(taskRepo);

/**
 * GET request for all tasks
 */
router.get('/tasks', async (ctx) => {
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
 * DELETE request to remove a single task
 */
router.delete('/delete-task', async (ctx) => {
  const taskId = ctx.request.body.id;
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
