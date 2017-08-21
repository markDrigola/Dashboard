"use strict";
const Task = require('../classes/Task').Task;

const s = Symbol;

class TaskCollection {
    constructor() {}

    getAllTask() {
        return new Promise((resolve, reject)=> {
            Task.find().then((arrTasks)=> {
                resolve(arrTasks);
            }).catch((error)=> {
                reject(error);
            });
        })
    }

    createTask(data) {
        data.date = new Date();
        const task = new Task(data);

        return new Promise ((resolve, reject)=> {
            task.save().then((data)=> {
                if(data) {
                    Task.find().then((arrTasks)=> {
                        resolve(arrTasks);
                    })
                }
            }).catch((error)=> {
                reject(error);
            });
        });
    }

    deleteTask(id) {
        return new Promise ((resolve, reject)=> {
            Task.remove({_id: id.id}).then((data)=> {
                if(data) {
                    Task.find().then((arrTasks) => {
                        resolve(arrTasks);
                    })
                }
            }).catch((error)=> {
                reject(error);
            });
        });
    }

    refactoringTask (data) {
        return new Promise ((resolve, reject)=> {
            Task.findById({_id: data._id}).then((dataClient)=> {
                if(dataClient) {
                    Object.assign(dataClient, data);
                    dataClient.save().then((data)=> {
                        if(data) {
                            Task.find().then((arrTasks) => {
                                resolve(arrTasks);
                            })
                        }
                    })
                }
            }).catch((error)=> {
                reject(error);
            });
        });
    }
}

module.exports = new TaskCollection();