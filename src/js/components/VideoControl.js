import React from 'react';
import Controls from './Controls';
import Progress from './Progress';

export default class VideoControl extends React.Component {
  render() {
    return (
      <div className="rv-controls">
        <Progress/>
        <Controls/>
      </div>
    );
  }
}
