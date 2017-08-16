"use strict";
const Client = require('../classes/Client').Client;
let moment = require('moment-timezone');
let userTimeZone = moment.tz.guess();
// const s = Symbol;
class ClientsCollection {
    constructor() {
        // console.log(Client.remove({}));
        // Client.find((err, el)=> {
        //     for(let i = 0; i < el.length; i++) {
        //         el[i].remove({});
        //     }
        //
        //     console.log(el);
        // })
        // return new Promise((resolve, reject)=> {
        //     Client.find().then((arrClients)=> {
        //         arrClients.remove(resolve);
        //     }).catch((error)=> {
        //         reject(error);
        //     });
        // })
        // Client.find().remove({});
        // Client.user.remove({});
    }

    getAllClients() {
        return new Promise((resolve, reject)=> {
            Client.find().then((arrClients)=> {
                resolve(arrClients);
            }).catch((error)=> {
                reject(error);
            });
        })
    }

    getAllClientsToDay() {
        let moment = require('moment-timezone');
        let userTimeZone = moment.tz.guess();
        // let timezone = require('moment-timezone');
        // console.log(moment().tz(userTimeZone).add('days').toDate());
        // let nowDate = moment().toDate();
        // moment.tz("2013-12-01", "America/Los_Angeles").format();

        let endDay = moment().tz(userTimeZone).add('days').endOf('day').toDate();
        // console.log(moment.tz.guess().format());
        let startDay = moment().tz(userTimeZone).add('days').startOf('day').toDate();


        // let nowDate2 = moment().add('days').startOf('day').toDate();

        return new Promise((resolve, reject)=> {
            Client.find({ dateOfCreation: { $gte: startDay, $lt: endDay } }).then((arrClients)=> {
                resolve(arrClients);
            }).catch((error)=> {
                reject(error);
            });
        })
    }

    getAllClientsPrevDay() {
        let moment = require('moment');

        // let nowDate = moment().toDate();
        let nowDate = moment().add(-1, 'days').endOf('day').toDate();
        let nowDate2 = moment().add(-1, 'days').startOf('day').toDate();

        return new Promise((resolve, reject)=> {
            Client.find({ dateOfCreation: { $gte: nowDate2, $lt: nowDate } }).then((arrClients)=> {
                resolve(arrClients);
            }).catch((error)=> {
                reject(error);
            });
        })
    }

    createClient (data) {
        data.dateOfCreation = new Date();
        const client = new Client(data);

        return new Promise ((resolve, reject)=> {
            client.save().then((data)=> {
                resolve(true);
            }).catch((error)=> {
                reject(error);
            });
        });
    }

    refactoringClient (data) {
        return new Promise ((resolve, reject)=> {
            Client.findById({_id: data._id}).then((dataClient)=> {
                Object.assign(dataClient, data);
                dataClient.save(resolve);
            }).catch((error)=> {
                reject(error);
            });
        });
    }

    updateRecord (subdomain,clientData) {
        const Client = require('../classes/Client').Client;
        return new Promise((resolve)=> {

            Client.find({subdomain}).then((data)=> {
                let client = data[0];
                // if (clientData.logo && !Array.isArray(clientData.logo.data)) {
                // 	clientData.logo.data = clientData.logo.data.data;
                // }
                Object.assign(client, clientData);
                client.save(resolve)
            });

        });
    }
}

module.exports = new ClientsCollection();