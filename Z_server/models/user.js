var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fbid: String,
    fbemail: String,
    fbname: String,
    fbpicture: String
});
/*
UserSchema.statics.findOrCreate = function findOrCreate (conditions, callback) {
  var self = this;
  this.findOne(conditions, function(err, result) {
    if(err || result) {
      callback(err, result, false)
    } else {
      for (var key in doc) {
       conditions[key] = doc[key];
      }
      var obj = new self(conditions)
      obj.save(function(err) {
        callback(err, obj, true);
      });
    }
  })
}
*/
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', UserSchema);
