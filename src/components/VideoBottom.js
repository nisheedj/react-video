var React = require('react');
var VideoControl = require('./VideoControl');
var VideoProgress = require('./VideoProgress');

var VideoBottom = React.createClass({

  render: function() {
    return (
      <div className="rv-bottom">
        <VideoProgress {...this.props}/>
        <VideoControl {...this.props}/>
      </div>
    );
  }

});

module.exports = VideoBottom;