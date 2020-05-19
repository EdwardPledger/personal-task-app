const DailyPlanner = require('../models/daily-planner');
const RepoError = require('../errors/repo-error');

module.exports = {
    getDailyPlannerByDate: async (date) => {
        try {
            DailyPlanner.findOne(date);
        } catch (err) {
            throw new RepoError(err.message, 'getDailyPlannerByDate', 'DailyPlanner', date);
        }
    }
}