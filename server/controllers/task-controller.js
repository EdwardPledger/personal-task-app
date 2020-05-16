const KoaRouter = require('koa-router');

const TaskService = require('../services/task-service');
const genericDao = require('../dao/crud-dao')

const router = new KoaRouter();
const taskService = new TaskService(genericDao);


/**
 * Home page
 */
router.get('/', async (ctx) => {
  const tasks = await taskService.getAllTasks();
  ctx.status = 200;
  ctx.message = 'Tasks returned.';
  // ctx.state.tasks = tasks;
  await ctx.render('index', { tasks });
});

/**
 * GET request for a single task by it's id
 */
router.get('/get-task/:id', async (ctx) => {
  const { id } = ctx.params;
  const task = await taskService.getTaskById(id);

  ctx.status = 200;
  ctx.message = 'Task retrieved.';
  ctx.body = task;
});

/**
 * GET request for all tasks
 */
router.get('/get-tasks', async (ctx) => {
  const tasks = await taskService.getAllTasks();

  ctx.status = 200;
  ctx.message = 'Tasks retrieved.';
  ctx.state.tasks = tasks;
});

/**
 * POST request to add a single task
 */
router.post('/add-task', async (ctx) => {
  const { body } = ctx.request;
  
  const insertedTask = await taskService.insertTask(body);
  
  ctx.status = 201;
  ctx.message = 'Task inserted.';
  ctx.body = insertedTask;
});

/**
 * PUT request to update a single task
 */
router.put('/update-task', async (ctx) => {
  let { body } = ctx.request;

  const updatedTask = await taskService.updateTask(body);
  ctx.status = 200;
  ctx.message = 'Task updated.';
  ctx.body = updatedTask;
});

/**
 * DELETE request to remove a single task
 */
router.delete('/delete-task/:id', async (ctx) => {
  const { id } = ctx.params;
  const deletedTask = await taskService.deleteTaskById(id);

  ctx.status = 200;
  ctx.message = 'Task deleted.';
  ctx.body = deletedTask;
});

/**
 * DELETE request to remove all tasks
 */
router.delete('/delete-all-tasks', async (ctx) => {
  const deletedTasks = await taskService.deleteAllTasks();
  
  ctx.status = 200;
  ctx.message = 'Tasks deleted.';
  ctx.body = deletedTasks;
});

module.exports = router;
