var Reflux = require('reflux');
var EmailCheckerActions = require('../actions/EmailCheckerActions.js');

var EmailStore = Reflux.createStore({
  _collection: [],
  init: function() {
    this.listenTo(EmailCheckerActions.check, this.check);
  },
  check: function(email) {
    var desc = getEmailDescriptor(email);
    var url = "/" + ["check", desc.names, desc.host, desc.ext].join("/");
    $.get(url)
    .then(function(serverData) {
      this.addObject(serverData);
    }.bind(this));
  },
  getAll: function() {
    return this._collection;
  },
  addObject: function(object) {
    this._collection.push(object);
    this.trigger();
  }
});

var getEmailDescriptor = function (email) {
  var emailParts = email.split("@");
  var hostname = emailParts[1];
  var hostNameArray = hostname.split(".");
  return {
    names: emailParts[0],
    host: hostNameArray[0],
    ext: hostNameArray[1]
  }
}


module.exports = EmailStore;
