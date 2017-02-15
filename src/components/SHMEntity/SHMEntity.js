import React from 'react';
import './SHMEntity.css';

/**
 * Canvas on which the posts are shown as dots (DOM Elements)
 */
class SHMEntityCanvas extends React.Component {
  render() {
    const x = this.props.entity.location.x;
    const y = this.props.entity.location.y;

    const style = {
      left: x,
      top: y
    }
    return (
      <div style={style} className="SHMEntity">

      </div>
    );
  }
}

export default SHMEntityCanvas;

