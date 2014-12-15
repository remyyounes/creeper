var React = require("react");

var FileDropper = React.createClass({
  render: function() {
    return (
      <div className="file-dropper">
        <input type="file"/>
        <div className="dropzone"/>
      </div>
    );
  }
});

module.exports = FileDropper;
