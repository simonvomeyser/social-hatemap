import React from 'react';
import './SHMEntityCanvas.css';
import SHMEntity from '../SHMEntity/SHMEntity';
    
/**
 * Canvas on which the posts are shown as dots (DOM Elements)
 */
class SHMEntityCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {SHMEntities: []};  
  }
  componentWillMount() {
    this.renderEntities();
  }
  render() {
    return (
      <div className="SHMEntityCanvas">
        {this.state.SHMEntities.map((e) => e)}
      </div>
    );
  }
  /**
   * Add the entitities to the canvas "piece by piece"
   * Solved with a timeout function
   */
  renderEntities() {
    const entities               = this.props.SHMEntities;
    const delayBetweenRenderings = 20;

    return entities.map((e, i) => {
      const newEntities = this.state.SHMEntities;
      setTimeout(() => {
        newEntities.push(<SHMEntity key={`SHMEntity-${i}`} entity={e}/>);
        this.setState({SHMEntities: newEntities});
        entities.length === i+1 ? this.finishedRenderingEntities():null;
      }, delayBetweenRenderings*i);
    });
  }
  /**
   * Called when all Entites are rendered
   */
  finishedRenderingEntities() {
    console.log (this.props);
    this.props.doneRenderingEntities();
    console.log (`Done rendering entites`);
  }
}

export default SHMEntityCanvas;

