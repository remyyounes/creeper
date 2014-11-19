/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var cx = require('react/lib/cx');
var _ = require('underscore');
var EmailStore = require('../stores/EmailStore.js');
var EmailCheckerActions = require('../actions/EmailCheckerActions.js');
var EmailCollection =  React.createClass({
  mixins: [Reflux.ListenerMixin],
  getinitialState: function(){
    return {
      emails: []
    }
  },
  componentDidMount: function() {
    this.listenTo(EmailStore, this.onStoreUpdate);
    this.fillStore();
  },
  fillStore: function() {
    _.each(this.props.emails, function(email){
      console.log(email);
      EmailStore.addObject(email);
    });
  },
  render: function(){
    var emails = this.renderEmails();
    return (<div>
      <ul className="email-checks">{emails}</ul>
      <div className="adder">
        <input ref="adderString"/>
        <button onClick={this.onAdd}>Check</button>
      </div>
    </div>);
  },
  renderEmails: function() {
    var emails = this.state && this.state.emails;
    return _.map(emails, function(email) {
      var className = cx({ "valid": email.result });
      return (<li className={className}>{email.email}</li>);
    });
  },
  onAdd: function() {
    var email = this.refs.adderString.getDOMNode().value;
    email && EmailCheckerActions.check(email);
  },
  onStoreUpdate: function() {
    this.setState({emails: EmailStore.getAll()});
  },
});

module.exports = EmailCollection;
