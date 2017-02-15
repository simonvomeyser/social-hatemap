import React from 'react';
import './SHMEntity.css';

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
    // @todo remove debug text, 
    return (
      <div style={style} className="SHMEntity">
        <div className="">
          {this.props.entity.location.name}
          <span>({Math.round(x.replace('%', ''))} left, {Math.round(y.replace('%', ''))} top)</span>
        </div>
      </div>

    );
  }
}

export default SHMEntity;

