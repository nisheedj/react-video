var ClassNames = require('classnames');
var React = require('react');
var VideoComponent = require('./components/VideoComponent');
var VideoProgress = require('./components/VideoProgress');
var VideoControls = require('./components/VideoControls');

var ReactVideo = React.createClass({
    getDefaultProps: function() {
        return {
            source: '',
            autoPlay: false,
            showControls: true,
            responsive: false,
            width: 300,
            height: 200,
            customClass: '',
            relatedVideos: []
        };
    },
    render: function() {
        var reactVideoClasses = ClassNames('rv-wrapper', this.props.customClass);
        return (
            <div className={reactVideoClasses}> 
				<VideoComponent {...this.props}/>
				<VideoProgress {...this.props}/>
				<VideoControls {...this.props}/>
			</div>
        );
    }

});

module.exports = ReactVideo;
