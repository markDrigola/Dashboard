let mongoose = require('../connectors/Mongoose').mongoose;

let taskSchema = mongoose.Schema({
    location: String,
    textUser: String,
    serviceType: String,
    taskType: String,
    date: {type: Date, default: new Date()},
    serviceTypeIndex: Number,
    taskTypeIndex: Number,
});

var uniqueValidator = require('mongoose-unique-validator');

taskSchema.plugin(uniqueValidator);

var Task = mongoose.model('Task', taskSchema);

module.exports.Task = Task;
