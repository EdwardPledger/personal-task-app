const KoaRouter = require('koa-router');

const TaskService = require('../services/task-service');
const taskRepo = require('../dao/task-repo');

const router = new KoaRouter();
const taskService = new TaskService(taskRepo);

/**
 * Home page
 */
router.get('/', async (ctx) => {
  try {
    const tasks = await taskService.getAllTasks();
    ctx.status = 200;
    ctx.message = 'Tasks returned.';
    // ctx.state.tasks = tasks;
    await ctx.render('index', { tasks });
  } catch (err) {
    // Error handling
    ctx.status = 400;
    ctx.message = 'Error occurred.';
    console.log('err', err);
    await ctx.render('index');
  }
});

/**
 * GET request for a single task by it's ID
 */
router.get('/get-task/:id', async (ctx) => {
  const { id } = ctx.params;
  const task = await taskService.getTaskById(id);

  ctx.status = 200;
  ctx.body = task;
});

/**
 * GET request for all tasks
 */
router.get('/get-tasks', async (ctx) => {
  const tasks = await taskService.getAllTasks();
  console.log('tasks called!');

  ctx.status = 200;
  ctx.body = tasks;
});

/**
 * POST request to add a single task
 */
router.post('/add-task', async (ctx) => {
  try {
    const taskDto = ctx.request.body; // Use destructuring method
    console.log(ctx.request);
    
    const task = await taskService.insertTask(taskDto);
    
    ctx.status = 201;
    ctx.message = 'Task inserted.';
    ctx.body = task;
  } catch (err) {
    ctx.status = 400;
    ctx.message = 'Error occurred.';
    console.log('err', err);
    ctx.redirect('/');
  }
});

/**
 * PUT request to update a single task
 */
router.put('/update-task', async (ctx) => {
  try {
    console.log('task', ctx.request.body);
    let updatedTaskDto = ctx.request.body;

    await taskService.updateTask(updatedTaskDto);
    ctx.status = 200;
    ctx.message = 'Task updated.';
    ctx.body = { message: ctx.message };
    // ctx.redirect('/');
  } catch (err) {
    ctx.status = 400;
    ctx.message = 'Error occurred.';
    console.log('err', err);
    ctx.redirect('/');
  }
});

/**
 * DELETE request to remove a single task
 */
router.delete('/delete-task/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    await taskService.deleteTask(id);

    ctx.status = 200;
    ctx.message = 'Task deleted.';
    ctx.body = { message: ctx.message };
  } catch (err) {
    ctx.status = 400;
    ctx.message = 'Error occurred.';
    console.log('err', err);
    ctx.redirect('/');
  }
});

/**
 * DELETE request to remove all tasks
 */
router.delete('/delete-all-tasks', async (ctx) => {
  taskService.deleteAllTasks();
  ctx.body = { message: 'All tasks deleted!' };
});

module.exports = router;
