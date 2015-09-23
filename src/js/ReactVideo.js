import ClassNames from 'classnames';
import React from 'react';
import Video from './components/Video';
import VideoControl from './components/VideoControl';

export default class ReactVideo extends React.Component {
  render() {
    let classes = ClassNames('rv-video', this.props.classes);
    return (
      <div className={classes}>
        <Video/>
        <VideoControl/>
      </div>
    );
  }
}

ReactVideo.defaultProps = {
  classes: [],
  sources: [],
  video: {}
};
