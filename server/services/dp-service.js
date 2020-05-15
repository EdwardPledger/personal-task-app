class DailyPlannerService {
  constructor(dao) {
    this.dao = dao;
}

  /**
   * Get a daily planner by it's id
   * @param {*} dailyPlannerId id of daily planner
   */
  async getDailyPlannerById(dailyPlannerId) {
    const dailyPlanner = await this.dao.getObjectById('DailyPlanner', dailyPlannerId);

    if (!dailyPlanner) {
      throw new NotFoundError(
        'No daily planner found with the id provided.', 
        'getDailyPlannerById', 'DailyPlanner', dailyPlannerId
      );
    }
    return dailyPlanner;
  }

  /**
   * Get all daily planners
   */
  async getAllDailyPlanners() {
    const dailyPlanners = await this.dao.getAllDailyPlanners('DailyPlanner');

    if (dailyPlanners.length === 0) console.log('No daily planners found in database.');
    
    return dailyPlanners;
  }

  /**
   * Insert a new daily planner
   * @param {*} dailyPlannerDto daily planner object
   */
  async insertDailyPlanner(dailyPlannerDto) {
    return await this.dao.insertObject('DailyPlanner', dailyPlannerDto);
  }

  /**
   * Update and existing daily planner
   * @param {*} updatedDailyPlannerDto daily planner object
   */
  async updateDailyPlanner(updatedDailyPlannerDto) {
    return await this.dao.updateObject('DailyPlanner', updatedDailyPlannerDto);
  }

  /**
   * Delete an existing daily planner by it's id
   * @param {*} dailyPlannerId id of daily planner
   */
  async deleteDailyPlannerById(dailyPlannerId) {
    const dailyPlanner = await this.dao.deleteObjectById('DailyPlanner', dailyPlannerId);

    if (!dailyPlanner) {
      throw new NotFoundError(
        'No daily planner found with the id provided.', 
        'deleteDailyPlannerById', 'DailyPlanner', dailyPlannerId
      );
    }

    return dailyPlanner;
  }

  /**
   * Delete all daily planners
   */
  async deleteAllDailyPlanners() {
    return await this.dao.deleteObjects('DailyPlanner');
  }
}

module.exports = DailyPlannerService;
