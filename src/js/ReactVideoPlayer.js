import React from 'react';

export default class ReactVideoPlayer extends React.Component {
  render() {
    return (
      <div className="rvp">
        <div className="rvp-video">
          <video className="rvp-video__el" src="media/big_buck_bunny.mp4"/>
        </div>
        <div className="rvp-gradient"/>
        <div className="rvp-progress">
          <div className="rvp-progress__complete"/>
          <div className="rvp-progress__loaded"/>
          <div className="rvp-progress__drag"/>
        </div>
        <div className="rvp-control">
          <button className="rvp-control__btn rvp-control__btn--play"/>
          <button className="rvp-control__btn rvp-control__btn--pause"/>
          <button className="rvp-control__btn rvp-control__btn--fullscreen"/>
        </div>
      </div>
    );
  }
}
