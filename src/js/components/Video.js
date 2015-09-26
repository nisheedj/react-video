import React from 'react';
import Controls from './Controls';

export default class Video extends React.Component {
  componentDidMount() {
    this.video = React.findDOMNode(this.refs.video);
    this.video.addEventListener('error', this.props.videoErrorCb);
    this.video.addEventListener('loadeddata', this.props.videoLoadedCb);
  }
  componentWillUnmount() {
    this.video.removeEventListener('error', this.props.videoErrorCb);
    this.video.removeEventListener('loadeddata', this.props.videoLoadedCb);
  }
  render() {
    return (
      <div className="rv-video">
        <video className="rv-video-element" ref="video" src={this.props.source} onContextMenu={this.props.contextMenuCb}/>
        <Controls ref="controls" {...this.props}/>
      </div>
    );
  }
}

Video.defaultProps = {
  source: '',
  videoErrorCb: () => {},
  videoLoadedCb: () => {}
};
