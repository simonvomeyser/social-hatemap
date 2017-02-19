import React from 'react';
import './SHMEntityCanvas.css';
import SHMEntity from '../SHMEntity/SHMEntity';
    
const delayBetweenRenderings = 25; // Delay between each Enitity beeing rendered on map
const animationDuration = 2000;    // The css duration of each Entity animatied in

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.SHMEntities.length != this.props.SHMEntities.length) {
      this.setState({
        SHMEntities: nextProps.SHMEntities.map((e, i) => (
          <SHMEntity key={`SHMEntity-${e.key}-`} entity={e}/>
        ))

      });
    }
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
    const entities = this.props.SHMEntities;

    return entities.map((e, i) => {
      const newEntities = this.state.SHMEntities;
      setTimeout(() => {
        newEntities.push(<SHMEntity key={`SHMEntity-${e.key}`} entity={e} animationDuration={animationDuration}/>);
        this.setState({SHMEntities: newEntities});
        entities.length === i+1 ? this.finishedRenderingEntities():null;
      }, delayBetweenRenderings*i);
    });
  }

  /**
   * Called when all Entites are rendered
   */
  finishedRenderingEntities() {
    // Wait for the last Entity to finish rendering
    setTimeout(() => {
      this.props.doneRenderingEntities();
    }, animationDuration);
  }
}

export default SHMEntityCanvas;

