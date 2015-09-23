(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactVideo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ClassNames = require('classnames');
var React = require('react');
var VideoComponent = require('./components/VideoComponent');
var VideoBottom = require('./components/VideoBottom');

var ReactVideo = React.createClass({
    displayName: 'ReactVideo',

    getDefaultProps: function getDefaultProps() {
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
    render: function render() {
        var reactVideoClasses = ClassNames('rv-wrapper', this.props.customClass);
        return React.createElement(
            'div',
            { className: reactVideoClasses },
            React.createElement(VideoComponent, _extends({ ref: 'test' }, this.props)),
            React.createElement(VideoBottom, this.props)
        );
    }

});

module.exports = ReactVideo;

},{"./components/VideoBottom":3,"./components/VideoComponent":4,"classnames":1,"react":7}],3:[function(require,module,exports){
'use strict';

var React = require('react');
var VideoControl = require('./VideoControl');
var VideoProgress = require('./VideoProgress');

var VideoBottom = React.createClass({
  displayName: 'VideoBottom',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'rv-bottom' },
      React.createElement(VideoProgress, this.props),
      React.createElement(VideoControl, this.props)
    );
  }

});

module.exports = VideoBottom;

},{"./VideoControl":5,"./VideoProgress":6,"react":7}],4:[function(require,module,exports){
"use strict";

var React = require('react');

var VideoComponent = React.createClass({
    displayName: "VideoComponent",

    render: function render() {
        return React.createElement(
            "div",
            { className: "rv-video" },
            React.createElement("video", null)
        );
    }

});

module.exports = VideoComponent;

},{"react":7}],5:[function(require,module,exports){
"use strict";

var React = require('react');

var VideoControl = React.createClass({
    displayName: "VideoControl",

    render: function render() {
        return React.createElement("div", { className: "rv-control" });
    }

});

module.exports = VideoControl;

},{"react":7}],6:[function(require,module,exports){
"use strict";

var React = require('react');

var VideoProgress = React.createClass({
	displayName: "VideoProgress",

	render: function render() {
		return React.createElement("div", { className: "rv-progress" });
	}

});

module.exports = VideoProgress;

},{"react":7}],7:[function(require,module,exports){
"use strict";

module.exports = window.React;

},{}]},{},[2])(2)
});