var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  Tweet = require('./models/Tweet'),
  EmailExistence = require("email-existence"),
  Q = require("q");

var checkEmail = function(email) {
  var deferred = Q.defer();
  EmailExistence.check(email, function(result, error){
    var mailBoxStatus = {
      email: email,
      error: error,
      result: result
    };

    if(error)  deferred.reject(mailBoxStatus);
    else deferred.resolve(mailBoxStatus);
  });
  return deferred.promise;
};


module.exports = {

  index: function(req, res) {
    // Call static model method to get tweets in the db
    var mailChecks = [
      checkEmail("ryounes@gmail.com"),
      checkEmail("remyWhat@gmail.com")
    ];

    Q.allSettled(mailChecks)
    .then(function (results) {
      res.send(results);
      //
      // results.forEach(function (result) {
      //   if (result.state === "fulfilled") {
      //       var value = result.value;
      //   } else {
      //       var reason = result.reason;
      //   }
      // });
    });


  },

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

      // Render as JSON
      res.send(tweets);

    });
  }

}
