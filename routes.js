var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  Tweet = require('./models/Tweet'),
  EmailExistence = require("email-existence");

module.exports = {

  index: function(req, res) {
    // Call static model method to get tweets in the db
    EmailExistence.check("ryounes@gmail.com", function(result, error){
      if(error)  res.send(error);
      else  res.send(result);
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
