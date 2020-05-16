const KoaRouter = require('koa-router');

const DailyPlannerService = require('../services/dp-service');
const genericDao = require('../dao/crud-dao')

const router = new KoaRouter();
const dailyPlannerService = new DailyPlannerService(genericDao);

/**
 * GET request for a single daily planner by it's id
 */
router.get('/get-daily-planner/:id', async (ctx) => {
  const { id } = ctx.params;
  const dailyPlanner = await dailyPlannerService.getDailyPlannerById(id);

  ctx.status = 200;
  ctx.message = 'Daily planner retrieved.';
  ctx.body = dailyPlanner;
});

/**
 * GET request for all daily planners
 */
router.get('/get-daily-planners', async (ctx) => {
  const dailyPlanners = await dailyPlannerService.getAllDailyPlanners();

  ctx.status = 200;
  ctx.message = 'Daily planners retrieved.';
  ctx.body = dailyPlanners;
});

/**
 * POST request to add a single daily planner
 */
router.post('/add-daily-planner', async (ctx) => {
  const { body } = ctx.request;
  
  const insertedDailyPlanner = await dailyPlannerService.insertDailyPlanner(body);
  
  ctx.status = 201;
  ctx.message = 'Daily planner inserted.';
  ctx.body = insertedDailyPlanner;
});

/**
 * PUT request to update a single daily planner
 */
router.put('/update-daily-planner', async (ctx) => {
  let { body } = ctx.request;

  const updatedDailyPlanner = await dailyPlannerService.updateDailyPlanner(body);
  ctx.status = 200;
  ctx.message = 'Daily planner updated.';
  ctx.body = updatedDailyPlanner;
});

/**
 * DELETE request to remove a single daily planner
 */
router.delete('/delete-daily-planner/:id', async (ctx) => {
  const { id } = ctx.params;
  const deletedDailyPlanner = await dailyPlannerService.deleteDailyPlannerById(id);

  ctx.status = 200;
  ctx.message = 'Daily planner deleted.';
  ctx.body = deletedDailyPlanner;
});

/**
 * DELETE request to remove all daily planners
 */
router.delete('/delete-all-daily-planners', async (ctx) => {
  const deletedDailyPlanners = await dailyPlannerService.deleteAllDailyPlanners();
  
  ctx.status = 200;
  ctx.message = 'Daily planners deleted.';
  ctx.body = deletedDailyPlanners;
});

module.exports = router;
