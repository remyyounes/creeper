(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<h1>Welcome to Meteor!</h1>\n\n  "), Spacebars.include(view.lookupTemplate("emailTester")) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("emailTester");
Template["emailTester"] = new Template("Template.emailTester", (function() {
  var view = this;
  return HTML.Raw('<input type="text" id="email">\n  <button>Test Email</button>');
}));

})();
