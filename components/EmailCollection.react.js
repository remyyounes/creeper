/** @jsx React.DOM */

var React = require('react');

var EmailCollection =  React.createClass({
  getinitialState: function(){
    return {
      emails: this.props.emails
    }
  },
  render: function(){
    var emails = [];
    var allEmails = this.props.emails;
    for (var i = 0; i < allEmails.length; i++) {
      var email = allEmails[i];
      emails.push(<li>{email.email} | {email.value.result} | {JSON.stringify(email)}</li>);
    }
    console.log("emails", emails);
    return (
      <ul>{emails}</ul>
    )
  }
});

module.exports = EmailCollection;
