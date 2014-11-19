var JSX = require('node-jsx').install(),
  React = require('react'),
  EmailCollection = require('./components/EmailCollection.react'),
  EmailExistence = require("email-existence"),
  Q = require("q"),
  _ = require("underscore");

var offline = true;

var checkEmail = function(email) {
  var deferred = Q.defer();
  if(offline){
    var mock = {
      email: email,
      error: null,
      result: true
    };
    deferred.resolve(mock);
  }else{
    EmailExistence.check(email, function(error, result){
      var mailBoxStatus = {
        email: email,
        error: error,
        result: result
      };

      if(error)  deferred.reject(mailBoxStatus);
      else deferred.resolve(mailBoxStatus);
    });
  }

  return deferred.promise;
};


module.exports = {

  index: function(req, res) {
    // Call static model method to get tweets in the db
    var markup = React.renderComponentToString(
      EmailCollection()
    );

    // Render our 'home' template
    res.render('home', {
      markup: markup, // Pass rendered react markup
      state: JSON.stringify({ }) // Pass current state to client side
    });
  },

  check: function(req, res) {
    var deferred = Q.defer();

    console.log(req.params.address);
    var mock = {
      email: req.params.email,
      error: null,
      result: Math.random() > 0.5
    };
    deferred.resolve(mock);
    var promise = deferred.promise;
    promise.then(function(checkResults){
      res.send(checkResults);
    });
    return promise;
  },


  page: function(req, res) {
    // Fetch tweets by page via param
    // Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
    //
    //   // Render as JSON
    //   res.send(tweets);
    //
    // });
  },

  generateEmails: function(names) {
    var combinations = _map(transformFunctions, function(transform) {
      return transform(names);
    });
    return combinations;
  }

}
