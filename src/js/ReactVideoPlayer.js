import React from 'react/addons';
import ClassNames from 'classnames';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class ReactVideoPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      videoWidth: 0,
      videoHeight: 0,
      canPlay: false,
      hideControls: true,
      hasError: false,
      progress: '0%',
      currentTime: '0:00',
      duration: '0:00'

    };
    this.hideControlsTimeout = null;
    this.bufferInterval = null;
    this.videoEvents = [
      'error',
      'canplay',
      'canplaythrough',
      'loadstart',
      'loadeddata',
      'loadedmetadata',
      'timeupdate',
      'play',
      'paused',
      'emptied',
      'stalled',
      'waiting',
      'durationchange'
    ];
  }
  componentDidMount() {
    window.addEventListener('resize', this.setVideoSize.bind(this));
    this.setVideoSize();
    this.addVideoEvents();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setVideoSize.bind(this));
    this.removeVideoEvents();
  }
  setVideoSize(e) {
    let videoWrapper = React.findDOMNode(this.refs.rvpVideoWapper);
    let [width, height] = [videoWrapper.offsetWidth, videoWrapper.offsetHeight];
    this.setState({
      videoWidth: width,
      videoHeight: height
    });
  }
  mouseenterHandler(e) {
    if (this.hideControlsTimeout) {
      window.clearTimeout(this.hideControlsTimeout);
    }
    //check if video can be played
    if (this.state.canPlay) {
      this.setState({
        hideControls: false
      });
    }
  }
  mouseleaveHandler(e) {
    let videoElement = React.findDOMNode(this.refs.rvpVideoElement);

    if (this.hideControlsTimeout) {
      window.clearTimeout(this.hideControlsTimeout);
    }
    //Check if video is paused else hide controls if video is playing
    if (!videoElement.paused && this.state.canPlay) {
      this.hideControlsTimeout = window.setTimeout(() => {
        this.setState({
          hideControls: true
        });
      }, 1000);
    }
  }
  addVideoEvents() {
    let videoElement = React.findDOMNode(this.refs.rvpVideoElement);
    this.videoEvents.map((eventName) => {
      let functionName = eventName + 'Callback';
      if (typeof this[functionName] === 'function') {
        videoElement.addEventListener(eventName, this[functionName].bind(this));
      }
    });
  }
  removeVideoEvents() {
    let videoElement = React.findDOMNode(this.refs.rvpVideoElement);
    this.videoEvents.map((eventName) => {
      let functionName = eventName + 'Callback';
      if (typeof this[functionName] === 'function') {
        videoElement.removeEventListener(eventName, this[functionName]);
      }
    });
  }
  errorCallback(e) {
    //Fires when an error occurs during object loading.
    let errorMsg = false;

    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        errorMsg = 'You aborted the video playback.';
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        errorMsg = 'A network error caused the video download to fail part-way.';
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        errorMsg = 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.';
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        errorMsg = 'The video could not be loaded, either because the server or network failed or because the format is not supported.';
        break;
      default:
        errorMsg = 'An unknown error occurred.';
        break;
    }

    this.setState({
      canPlay: false,
      hideControls: true,
      hasError: errorMsg
    });
  }
  canplayCallback(e) {
    // Occurs when playback is possible, but would require further buffering.
    // Content has loaded, display buttons and set up events
    this.setState({
      canPlay: true,
      hideControls: false,
      hasError: false
    });
  }
  timeupdateCallback(e) {
    //Occurs to indicate the current playback position.
    let currentTime = e.target.currentTime.toFixed(1);
    let duration = e.target.duration.toFixed(1);
    let progress = currentTime / duration * 100;

    let minutes = Math.floor(e.target.currentTime / 60);
    let seconds = Math.floor(e.target.currentTime % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;

    //update progress here
    if (!this.state.hideControls) {
      this.setState({
        progress: progress + '%',
        currentTime: minutes + ":" + seconds
      });
    }
  }
  loadstartCallback(e) {
    //Occurs when browser begins looking for media data.
    this.bufferInterval = window.setInterval(this.watchBuffer.bind(this, e.target), 500);
  }
  watchBuffer(videoElement) {
    if (videoElement.readyState) {
      let videoDuration = videoElement.duration;
      let buffered = videoElement.buffered.end(0);
      let percent = 100 * buffered / videoDuration;

      //Set progress loaded here

      //If finished buffering buffering quit calling it
      if (buffered >= videoDuration) {
        window.clearInterval(this.bufferInterval);
      }
    }
  }
  render() {
    let videoStyles = {
      width: this.state.videoWidth,
      height: this.state.videoHeight
    };
    let playerClasses = ClassNames('rvp', {
      'rvp--show-controls': !this.state.hideControls
    });
    return (
      <ReactCSSTransitionGroup className={playerClasses} transitionName="rvp" transitionAppear={true} component="div">
        <div className="rvp-inner" onMouseEnter={this.mouseenterHandler.bind(this)} onMouseLeave={this.mouseleaveHandler.bind(this)}>
          <div ref="rvpVideoWapper" className="rvp-video">
            <video ref="rvpVideoElement" className="rvp-video__el" src="http://media.w3.org/2010/05/video/movie_300.mp4" style={videoStyles} preload='auto' onTimeupdate={(e) => console.log(e)}/>
          </div>
          <div className="rvp-gradient"/>
          <div className="rvp-progress">
            <div className="rvp-progress__track"/>
            <div className="rvp-progress__loaded"/>
            <div className="rvp-progress__handle"/>
          </div>
          <div className="rvp-control">
            {/*Play/Pause btn*/}
            <button className="rvp-btn"/>
            <div className="rvp-time">
              <div className="rvp-time__current">{this.state.currentTime}</div>
              <div className="rvp-time__duration">{this.state.duration}</div>
            </div>
            <div className="rvp-volume">
              <div className="rvp-volume-icon"/>
              <div className="rvp-volume-slider">
                <div className="rvp-volume-slider__track"/>
                <div className="rvp-volume-slider__handle"/>
              </div>
            </div>
            {/*Fullscreen btn*/}
            <button className="rvp-btn"/>
          </div>  
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
