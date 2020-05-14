const DailyPlanner = require('../models/daily-planner');

module.exports = {
    /**
     * Get daily planner by id
     */
    getDailyPlannerById: async (dailyPlannerId) => {
        try {
            return await DailyPlanner.findOne({ _id: dailyPlannerId });
        } catch (err) {
            console.error(`Repo Error (get)`)
        }
    }
}