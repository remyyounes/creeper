/** @jsx React.DOM */

var React = require('react');
var Creeper = require('./components/Creeper.react');
var EmailCollection = require('./components/EmailCollection.react');

// Snag the initial state that was passed from the server side
// var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
// console.log("initialState", initialState);
// Render the components, picking up where react left off on the server
React.renderComponent(
  <Creeper/>,
  document.getElementById('react-app')
);
