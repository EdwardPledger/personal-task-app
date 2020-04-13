const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  actualTime: Number,
  taskState: Boolean,
  name: String,
  description: String,
  estimatedTime: Number,
},
{
  collection: 'task',
});

module.exports = mongoose.model('Task', taskSchema);
