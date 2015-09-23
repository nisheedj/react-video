var React = require('react');

var VideoComponent = React.createClass({

    render: function() {
        return (
          <div className="rv-video">
				    <video />
		      </div>
        );
    }

});

module.exports = VideoComponent;
