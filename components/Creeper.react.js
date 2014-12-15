/** @jsx React.DOM */
var React = require("react");
var FileDropper = require("./FileDropper.react");
var EmailCollection = require('./EmailCollection.react');
var Creeper = React.createClass({
  render: function() {
    return (
      <div>
        <FileDropper/>
        <EmailCollection/>,
      </div>
    );
  }
});


module.exports = Creeper;
