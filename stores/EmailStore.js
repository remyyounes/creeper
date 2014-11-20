var Reflux = require('reflux');
var EmailCheckerActions = require('../actions/EmailCheckerActions.js');
var _ = require('underscore');

var EmailStore = Reflux.createStore({
  _collection: [],
  init: function() {
    this.listenTo(EmailCheckerActions.check, this.check);
  },
  check: function(names, hostname) {
    var url = "/" + ["check", names, hostname].join("/");
    var store = this;
    $.get(url)
    .then(function(checkedEmails) {
      _.each(checkedEmails, function(email) {
        store.addObject(email);
      });
    });
  },
  getAll: function() {
    return this._collection;
  },
  addObject: function(object) {
    object && this._collection.push(object);
    this.trigger();
  }
});


module.exports = EmailStore;
