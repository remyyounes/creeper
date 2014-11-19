var Reflux = require('reflux');
var EmailCheckerActions = require('../actions/EmailCheckerActions.js');

var EmailStore = Reflux.createStore({
  _collection: [],
  init: function() {
    this.listenTo(EmailCheckerActions.check, this.check);
  },
  check: function(email) {
    $.get("/check/"+ email)
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


module.exports = EmailStore;
