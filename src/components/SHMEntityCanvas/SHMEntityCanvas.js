import React from 'react';
import './SHMEntityCanvas.css';
import SHMEntity from '../SHMEntity/SHMEntity';
    
/**
 * Canvas on which the posts are shown as dots (DOM Elements)
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
      return <SHMEntity key={`SHMEntity-${i}`} entity={e}/>
    });
  }
}

export default SHMEntityCanvas;

