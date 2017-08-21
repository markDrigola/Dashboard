"use strict";
var mongoose = require('mongoose');

class MongooseConnector {
  constructor () {

    const SERVER_SETTINGS = {
      mongoConnection: {
        host: '127.0.0.1',
        port: '27017',
        dbName: 'test',
        name: "dashboard",
        // name: "admin",
        //   password: "myuser123"
          // password: "fFBuUuBKCeBnxbFe"
      }
    };


    const mongoLinc = `mongodb://${SERVER_SETTINGS.mongoConnection.host}:${SERVER_SETTINGS.mongoConnection.port}/${SERVER_SETTINGS.mongoConnection.dbName}`;
    // const mongoLinc = `mongodb://${SERVER_SETTINGS.mongoConnection.name}:${SERVER_SETTINGS.mongoConnection.password}@${SERVER_SETTINGS.mongoConnection.host}:${SERVER_SETTINGS.mongoConnection.port}/${SERVER_SETTINGS.mongoConnection.dbName}`;

      mongoose.connect(mongoLinc);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('connected to db')
      // we're connected!
    });
  }

  get mongoose () {
    return mongoose;
  }

}

module.exports = new MongooseConnector();