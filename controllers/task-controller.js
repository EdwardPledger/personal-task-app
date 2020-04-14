const KoaRouter = require('koa-router');
const TaskService = require('../services/task-service');
const taskRepo = require('../dao/task-repo');

const router = new KoaRouter();
const taskService = new TaskService(taskRepo);

router.get('/tasks', async (ctx) => {
  console.log('controller');
  const tasks = await taskService.getAllTasks();
  console.log('tasks', tasks);
  ctx.body = tasks;
});

module.exports = router;
