(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactVideoPlayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd){
		// AMD. Register as an anonymous module.
		define(function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}

}());

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ReactCSSTransitionGroup = _reactAddons2['default'].addons.CSSTransitionGroup;

var ReactVideoPlayer = (function (_React$Component) {
  _inherits(ReactVideoPlayer, _React$Component);

  function ReactVideoPlayer() {
    _classCallCheck(this, ReactVideoPlayer);

    _get(Object.getPrototypeOf(ReactVideoPlayer.prototype), 'constructor', this).call(this);
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
    this.videoEvents = ['error', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'play', 'paused', 'emptied', 'stalled', 'waiting', 'durationchange'];
  }

  _createClass(ReactVideoPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.setVideoSize.bind(this));
      this.setVideoSize();
      this.addVideoEvents();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.setVideoSize.bind(this));
      this.removeVideoEvents();
    }
  }, {
    key: 'setVideoSize',
    value: function setVideoSize(e) {
      var videoWrapper = _reactAddons2['default'].findDOMNode(this.refs.rvpVideoWapper);
      var width = videoWrapper.offsetWidth;
      var height = videoWrapper.offsetHeight;

      this.setState({
        videoWidth: width,
        videoHeight: height
      });
    }
  }, {
    key: 'mouseenterHandler',
    value: function mouseenterHandler(e) {
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
  }, {
    key: 'mouseleaveHandler',
    value: function mouseleaveHandler(e) {
      var _this = this;

      var videoElement = _reactAddons2['default'].findDOMNode(this.refs.rvpVideoElement);

      if (this.hideControlsTimeout) {
        window.clearTimeout(this.hideControlsTimeout);
      }
      //Check if video is paused else hide controls if video is playing
      if (!videoElement.paused && this.state.canPlay) {
        this.hideControlsTimeout = window.setTimeout(function () {
          _this.setState({
            hideControls: true
          });
        }, 1000);
      }
    }
  }, {
    key: 'addVideoEvents',
    value: function addVideoEvents() {
      var _this2 = this;

      var videoElement = _reactAddons2['default'].findDOMNode(this.refs.rvpVideoElement);
      this.videoEvents.map(function (eventName) {
        var functionName = eventName + 'Callback';
        if (typeof _this2[functionName] === 'function') {
          videoElement.addEventListener(eventName, _this2[functionName].bind(_this2));
        }
      });
    }
  }, {
    key: 'removeVideoEvents',
    value: function removeVideoEvents() {
      var _this3 = this;

      var videoElement = _reactAddons2['default'].findDOMNode(this.refs.rvpVideoElement);
      this.videoEvents.map(function (eventName) {
        var functionName = eventName + 'Callback';
        if (typeof _this3[functionName] === 'function') {
          videoElement.removeEventListener(eventName, _this3[functionName]);
        }
      });
    }
  }, {
    key: 'errorCallback',
    value: function errorCallback(e) {
      //Fires when an error occurs during object loading.
      var errorMsg = false;

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
  }, {
    key: 'canplayCallback',
    value: function canplayCallback(e) {
      // Occurs when playback is possible, but would require further buffering.
      // Content has loaded, display buttons and set up events
      this.setState({
        canPlay: true,
        hideControls: false,
        hasError: false
      });
    }
  }, {
    key: 'timeupdateCallback',
    value: function timeupdateCallback(e) {
      //Occurs to indicate the current playback position.
      var currentTime = e.target.currentTime.toFixed(1);
      var duration = e.target.duration.toFixed(1);
      var progress = currentTime / duration * 100;

      var minutes = Math.floor(e.target.currentTime / 60);
      var seconds = Math.floor(e.target.currentTime % 60);
      seconds = seconds >= 10 ? seconds : "0" + seconds;

      //update progress here
      if (!this.state.hideControls) {
        this.setState({
          progress: progress + '%',
          currentTime: minutes + ":" + seconds
        });
      }
    }
  }, {
    key: 'loadstartCallback',
    value: function loadstartCallback(e) {
      //Occurs when browser begins looking for media data.
      this.bufferInterval = window.setInterval(this.watchBuffer.bind(this, e.target), 500);
    }
  }, {
    key: 'watchBuffer',
    value: function watchBuffer(videoElement) {
      if (videoElement.readyState) {
        var videoDuration = videoElement.duration;
        var buffered = videoElement.buffered.end(0);
        var percent = 100 * buffered / videoDuration;

        //Set progress loaded here

        //If finished buffering buffering quit calling it
        if (buffered >= videoDuration) {
          window.clearInterval(this.bufferInterval);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var videoStyles = {
        width: this.state.videoWidth,
        height: this.state.videoHeight
      };
      var playerClasses = (0, _classnames2['default'])('rvp', {
        'rvp--show-controls': !this.state.hideControls
      });
      return _reactAddons2['default'].createElement(
        ReactCSSTransitionGroup,
        { className: playerClasses, transitionName: 'rvp', transitionAppear: true, component: 'div' },
        _reactAddons2['default'].createElement(
          'div',
          { className: 'rvp-inner', onMouseEnter: this.mouseenterHandler.bind(this), onMouseLeave: this.mouseleaveHandler.bind(this) },
          _reactAddons2['default'].createElement(
            'div',
            { ref: 'rvpVideoWapper', className: 'rvp-video' },
            _reactAddons2['default'].createElement('video', { ref: 'rvpVideoElement', className: 'rvp-video__el', src: 'http://media.w3.org/2010/05/video/movie_300.mp4', style: videoStyles, preload: 'auto', onTimeupdate: function (e) {
                return console.log(e);
              } })
          ),
          _reactAddons2['default'].createElement('div', { className: 'rvp-gradient' }),
          _reactAddons2['default'].createElement(
            'div',
            { className: 'rvp-progress' },
            _reactAddons2['default'].createElement('div', { className: 'rvp-progress__track' }),
            _reactAddons2['default'].createElement('div', { className: 'rvp-progress__loaded' }),
            _reactAddons2['default'].createElement('div', { className: 'rvp-progress__handle' })
          ),
          _reactAddons2['default'].createElement(
            'div',
            { className: 'rvp-control' },
            _reactAddons2['default'].createElement('button', { className: 'rvp-btn' }),
            _reactAddons2['default'].createElement(
              'div',
              { className: 'rvp-time' },
              _reactAddons2['default'].createElement(
                'div',
                { className: 'rvp-time__current' },
                this.state.currentTime
              ),
              _reactAddons2['default'].createElement(
                'div',
                { className: 'rvp-time__duration' },
                this.state.duration
              )
            ),
            _reactAddons2['default'].createElement(
              'div',
              { className: 'rvp-volume' },
              _reactAddons2['default'].createElement('div', { className: 'rvp-volume-icon' }),
              _reactAddons2['default'].createElement(
                'div',
                { className: 'rvp-volume-slider' },
                _reactAddons2['default'].createElement('div', { className: 'rvp-volume-slider__track' }),
                _reactAddons2['default'].createElement('div', { className: 'rvp-volume-slider__handle' })
              )
            ),
            _reactAddons2['default'].createElement('button', { className: 'rvp-btn' })
          )
        )
      );
    }
  }]);

  return ReactVideoPlayer;
})(_reactAddons2['default'].Component);

exports['default'] = ReactVideoPlayer;
module.exports = exports['default'];
/*Play/Pause btn*/ /*Fullscreen btn*/

},{"classnames":1,"react/addons":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = window.React;
module.exports = exports["default"];

},{}]},{},[2])(2)
});