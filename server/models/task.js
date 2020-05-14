const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  actualTime: {
    type: Number,
    default: 0,
  },
  // false means not competed, true means completed
  taskState: {
    type: Boolean,
    default: false,
  },
  name: String,
  description: String,
  estimatedTime: Number,
},
{
  collection: 'task',
});

module.exports = mongoose.model('Task', taskSchema);
