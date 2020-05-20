const startOfDay = require('date-fns/startOfDay');
const endOfDay = require('date-fns/endOfDay');
const DailyPlanner = require('../models/daily-planner');
const RepoError = require('../errors/repo-error');


module.exports = {
    getDailyPlannerByDate: async (date) => {
        try {
            return await DailyPlanner.findOne({
                date: {
                    $gte: startOfDay(date),
                    $lte: endOfDay(date)
                }
            });
        } catch (err) {
            throw new RepoError(err.message, 'getDailyPlannerByDate', 'DailyPlanner', date);
        }
    }
}