const mongoose = require('mongoose');

const Task = require('./task');

const { Schema } = mongoose;

// TODO: Need to figure out how to store time of day
const dailyPlannerSchema = new Schema({
    date: Date,
    tasks: [Task]
});

module.exports = mongoose.model('DailyPlanner', dailyPlannerSchema);