// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TruckSchema   = new Schema({
    crewSize: String,
    startTime: String,
    endTime: String,
    avgTime: String
});
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Truck', TruckSchema);
