var JSX = require('node-jsx').install(),
  React = require('react'),
  EmailCollection = require('./components/EmailCollection.react'),
  EmailExistence = require("email-existence"),
  Q = require("q");

var checkEmail = function(email) {
  var deferred = Q.defer();
  EmailExistence.check(email, function(error, result){
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
      // res.send(results);
      var emails = [];
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        console.log("===========");
        console.log(result.value);
        console.log("-----------");
        emails.push(result.value);
      }
      // Render React to a string, passing in our fetched tweets
      try {
        var markup = React.renderComponentToString(
          EmailCollection({ emails: emails })
        );

      } catch(e){
        console.log("error!", e.stack());
      }

      console.log("soFar");
      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify({emails: emails}) // Pass current state to client side
      });
      console.log("soGood");

    });
  },

  page: function(req, res) {
    // Fetch tweets by page via param
    // Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
    //
    //   // Render as JSON
    //   res.send(tweets);
    //
    // });
  }

}
