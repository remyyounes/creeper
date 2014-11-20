var JSX = require('node-jsx').install(),
  React = require('react'),
  EmailCollection = require('./components/EmailCollection.react'),
  EmailExistence = require("email-existence"),
  Q = require("q"),
  _ = require("underscore");

var offline = 0;

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
    var emails = generateEmailsNames(req.params.names.split(" "));
    var checkPromises = _.map(emails, function(mail) {
      var email = [mail, "@", req.params.hostname].join("");
      return checkEmail(email);
    });
    var promise = Q.allSettled(checkPromises).then(function(emailResults){
      res.send(_.pluck(emailResults, "value"));
    });
    return promise;
  },

};

var generateEmailsNames = function(names) {
  debugger;
  if (names.length < 1) return null;
  var namesPermutations = generateNamesPermutations(names);
  var combinations = _.map(transformFunctions, function(transform) {
    return _.map(namesPermutations, transform);
  });
  return _.flatten(combinations);
};

var generateNamesPermutations = function(names) {
  if (names.length < 1) return null;
  var currentName = names.shift();
  var rest = generateNamesPermutations(names);
  var permutations = combinePermutations(currentName, rest);
  return permutations;
};

var combinePermutations = function(currentName, listPermutations) {
  var permutations = [];
  var namePermutations = generateNamePermutations(currentName);
  if(listPermutations){
    _.each(listPermutations, function(permutation) {
      _.each(namePermutations, function(namePermutation) {
        permutations.push(_.flatten([namePermutation, permutation]));
      });
    });
  }else{
    permutations = namePermutations;
  }
  return permutations;
};

var generateNamePermutations = function (name) {
  var permutations = [];
  permutations.push([name]);
  permutations.push([name[0]]);
  return permutations;
}

var transformFunctions = [
  function(names) { return names.join("."); },
  function(names) { return names.join("-"); },
  function(names) { return names.join("_"); },
  function(names) { return names.join(""); }
];
