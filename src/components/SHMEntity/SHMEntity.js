import React from 'react';
import './SHMEntity.css';
import ReactTooltip from 'react-tooltip'
import Tweet from '../Tweet/Tweet'

/**
 * Canvas on which the posts are shown as dots (DOM Elements)
 */
class SHMEntity extends React.Component {
  render() {
    const x = this.props.entity.location.x;
    const y = this.props.entity.location.y;
    const style = {
      left: x,
      top: y,
      animationDuration: this.props.animationDuration/1000 + "s"
    }
    const tooltipId = "tooltip" +Math.random();
    return (
      <div>
        <div
          data-tip=""
          data-place="top"
          data-delay-show='200'
          data-for={tooltipId}
          data-event='click'
          data-event-off='dblclick'
          style={style} className="SHMEntity">
        </div>
        <ReactTooltip id={tooltipId} globalEventOff='click'>
          <Tweet entity={this.props.entity}/>
        </ReactTooltip>
      </div>
    );
  }
}

export default SHMEntity;

