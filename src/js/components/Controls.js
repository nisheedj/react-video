import React from 'react';
import ProgressControl from './ProgressControl';
import TimeIndex from './TimeIndex';
import FullscreenControl from './FullscreenControl';
import VideoControl from './VideoControl';
import VolumeControl from './VolumeControl';

export default class Controls extends React.Component {
  render() {
    return (
      <div className="rv-controls">
        <ProgressControl ref="progress" {...this.props}/>
        <div className="rv-controls-bottom" {...this.props}>
          <VideoControl ref="videoControl" {...this.props}/>
          <TimeIndex ref="timeIndex" {...this.props}/>
          <VolumeControl ref="volumeControl" {...this.props}/>
          <FullscreenControl ref="fullscreenControl" {...this.props}/>
        </div>
      </div>
    );
  }
}
