import React from 'react';

export default class ErrorMsg extends React.Component {
  componentDidMount() {
    console.log(React.findDOMNode(this));
  }
  componentWillUnmount() {
    
  }
  render() {
    return (
      <div style={{display:this.props.msg ? 'block' : 'none'}} onClick={this.props.reloadCb}>
          {this.props.msg}
      </div>
    );
  }
}

ErrorMsg.defaultProps = {
  msg: null,
  reloadCb: () => {}
};
