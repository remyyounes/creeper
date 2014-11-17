var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  EmailCollection = require('./components/EmailCollection.react'),
  Tweet = require('./models/Tweet'),
  EmailExistence = require("email-existence"),
  Q = require("q");

var checkEmail = function(email) {
  var deferred = Q.defer();
  EmailExistence.check(email, function(error, result){
    var mailBoxStatus = {
      // email: email,
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
      // res.send(results);

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderComponentToString(
        EmailCollection({
          emails: results
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(emails) // Pass current state to client side
      });

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
