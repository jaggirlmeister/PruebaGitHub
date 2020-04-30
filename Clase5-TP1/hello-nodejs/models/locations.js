var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationsSchema = new Schema({
    id: {type: String},
    lat: {type: String},
    lng: {type: String},
    name: {type: String},
    description: {type: String},
    type: {type: String}
})

module.exports = mongoose.model('Location', locationsSchema, 'locations');