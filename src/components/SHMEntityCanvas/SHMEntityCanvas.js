import React from 'react';
import './SHMEntityCanvas.css';

/**
 * Canvas on which the posts are shown as dots
 */
class SHMEntityCanvas extends React.Component {
  render() {
    return (
      <div className="SHMEntityCanvas">
        {this.renderEntities()}
      </div>
    );
  }
  renderEntities() {
    return this.props.entities.map((e, i) => {
      const x = e.location.x;
      const y = e.location.y;

      const style = {
        position: "absolute",
        left: x,
        top: y,
        width: "2px",
        height: "2px",
        display: "block",
        "background": "red"
      }
      return <span key={i+"-"+  x + "-" + y} style={style}></span>
    });
  }
}

export default SHMEntityCanvas;

