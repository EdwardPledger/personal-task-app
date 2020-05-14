const KoaRouter = require('koa-router');

const TaskService = require('../services/task-service');
const taskRepo = require('../dao/task-dao');
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
 * GET request for a single task by it's ID
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
  ctx.body = tasks;
});

/**
 * POST request to add a single task
 */
router.post('/add-task', async (ctx) => {
  const taskDto = ctx.request.body; // Use destructuring method
  console.log(ctx.request);
  
  const task = await taskService.insertTask(taskDto);
  
  ctx.status = 201;
  ctx.message = 'Task inserted.';
  ctx.body = task;
});

/**
 * PUT request to update a single task
 */
router.put('/update-task', async (ctx) => {
  let updatedTaskDto = ctx.request.body;

  await taskService.updateTask(updatedTaskDto);
  ctx.status = 200;
  ctx.message = 'Task updated.';
  ctx.body = { message: ctx.message };
});

/**
 * DELETE request to remove a single task
 */
router.delete('/delete-task/:id', async (ctx) => {
  const { id } = ctx.params;
  await taskService.deleteTaskById(id);

  ctx.status = 200;
  ctx.message = 'Task deleted.';
  ctx.body = { message: ctx.message };
});

/**
 * DELETE request to remove all tasks
 */
router.delete('/delete-all-tasks', async (ctx) => {
  taskService.deleteAllTasks();
  ctx.body = { message: 'All tasks deleted!' };
});

module.exports = router;
