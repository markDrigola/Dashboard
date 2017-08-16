let mongoose = require('../connectors/Mongoose').mongoose;


let clientSchema = mongoose.Schema({
    nameNotes: { type: String, required: true },
    textNotes: String,
    dateOfCreation: {type: Date, default: new Date()},
    // dateOfCreation: {type: Date, default: new Date()},
    statusInd: Boolean,
    statusDelete: Boolean,
    positions: [
        {
            name: String,
            value: Number,
            coefficient: Number
        }
    ]
});

// clientSchema.methods.addData = function (req) {
//     const data = {
//         phone: req.body.phone,
//         mac: req.body.mac,
//         facebook: {userId: req.body.userId, name: req.body.name},
//         date: new Date()
//     };
//
//     this.visitors.push(data);
//     return this.save();
// };

var uniqueValidator = require('mongoose-unique-validator');

clientSchema.plugin(uniqueValidator);

var Client = mongoose.model('Client', clientSchema);

module.exports.Client = Client;
