// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RouteSchema   = new Schema({
    address: String,
    isOrigin: String
});
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Route', RouteSchema);
