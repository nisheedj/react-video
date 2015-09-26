/*import ClassNames from 'classnames';
import Screenfull from 'screenfull';
import React from 'react';
import Video from './components/Video';
import ErrorMsg from './components/ErrorMsg';

export default class ReactVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      enableControls: false
    };
  }
  videoErrorCb(e) {
    let errorMsg = null;

    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        errorMsg = this.props.mediaErrorAborted;
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        errorMsg = this.props.mediaErrorNetwork;
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        errorMsg = this.props.mediaErrorDecode;
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        errorMsg = this.props.mediaErrorNotSupported;
        break;
      default:
        errorMsg = this.props.mediaErrorOther;
        break;
    }

    this.setState({
      error: errorMsg,
      enableControls: false
    });
  }
  videoLoadedCb(e) {
    this.setState({
      error: null,
      enableControls: true
    });
  }
  reloadCb(e) {
    e.preventDefault();
    this.setState({
      error: null,
      enableControls: false
    });
  }
  contextMenuCb(e) {
    e.preventDefault();
    console.log('Context Menu');
    return false;
  }
  render() {
    let classes = ClassNames('rv-wrapper', this.props.classes);
    let videoComponent = null;
    if (this.state.error !== null && typeof this.state.error === 'string') {
      videoComponent = <ErrorMsg msg={this.state.error} reloadCb={this.reloadCb.bind(this)} contextMenuCb={this.contextMenuCb.bind(this)}/>;
    } else {
      videoComponent = <Video ref="video" source={this.props.source} videoErrorCb={this.videoErrorCb.bind(this)} videoLoadedCb={this.videoLoadedCb.bind(this)} contextMenuCb={this.contextMenuCb.bind(this)}/>;
    }
    return (
      <div className={classes}>
        {videoComponent}
      </div>
    );
  }
}

ReactVideo.defaultProps = {
  classes: [],
  source: '',//'media/big_buck_bunny.mp4',
  mediaErrorAborted: 'You aborted the video playback.',
  mediaErrorNetwork: 'A network error caused the video download to fail part-way.',
  mediaErrorDecode: 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.',
  mediaErrorNotSupported: 'The video could not be loaded, either because the server or network failed or because the format is not supported.',
  mediaErrorOther: 'An unknown error occurred.'
};
*/

import React from 'react';

class Component extends React.Component {
  showContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Context Menu');
    return false;
  }
  applyContextMenu(domNode) {
    if (domNode instanceof HTMLElement) {
      domNode.addEventListener('contextmenu', this.showContextMenu.bind(this));
    }
  }
  discardContextMenu(domNode) {
    if (domNode instanceof HTMLElement) {
      domNode.removeEventListener('contextmenu', this.showContextMenu.bind(this));
    }
  }
}

class ReactVideo extends Component {
  componentDidMount() {
    super.applyContextMenu(React.findDOMNode(this));
  }
  componentWillUnmount() {
    super.discardContextMenu(React.findDOMNode(this));
  }
  render() {
    return (
      <div style={{width:640,height:380}}/>
    );
  }
}

//export Component;

export default ReactVideo;
