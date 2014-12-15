var React = require("react");
var FileDropper = require("./FileDropper.react");
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
