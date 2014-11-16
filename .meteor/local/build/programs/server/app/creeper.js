(function(){
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.emailTester.helpers({
    // counter: function () {
    //   return Session.get("counter");
    // }
  });

  Template.emailTester.events({
    'click button': function () {
      var email = document.getElementById("email").value;
       Meteor.call("emailCheck", email, function(err, res){
        alert(res);
      });
    }
  });
}

if (Meteor.isServer) {
  var emailExistence = Meteor.require("email-existence");
  var parse = Meteor.require('csv-parse');
  Meteor.startup(function () {
    console.log("Server Starting...");
  });

  Meteor.methods({
    emailCheck: function (email) {
      var Future = Meteor.require('fibers/future');
      var myFuture = new Future();

      emailExistence.check(email, function(err,res) {
        err && myFuture.throw(err);
        res && myFuture.return(res?"good":"bad");
      });
      // setTimeout(function(){
      //   myFuture.return(email);
      // }, 1000);
      return myFuture.wait();
    }
  });
}

})();
