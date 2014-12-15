var React = require("react");

var FileDropper = React.createClass({
  render: function() {
    return (
      <div className="file-dropper">
        <input type="file"/>
        <div className="dropzone" onDrop={this.handleDrop} />
      </div>
    );
  },
  handleDrop: function(event) {
    var file = event.dataTransfer.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onLoad = function () {
      var data = reader.result;
      console.log(data);
    };
  }
});

module.exports = FileDropper;
