import React from 'react';
import './SHMEntityCanvas.css';
import SHMEntity from '../SHMEntity/SHMEntity';
    
/**
 * Canvas on which the posts are shown as dots (DOM Elements)
 */
class SHMEntityCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {entities: []};  
  }
  componentWillMount() {
    this.renderEntities();
  }
  render() {
    return (
      <div className="SHMEntityCanvas">
        {this.state.entities.map((e) => e)}
      </div>
    );
  }
  renderEntities() {
    return this.props.entities.map((e, i) => {
      const newEntities = this.state.entities;
      setTimeout(() => {
        newEntities.push(<SHMEntity key={`SHMEntity-${i}`} entity={e}/>);
        this.setState({entities: newEntities});
      }, 20*i);
    });
  }
}

export default SHMEntityCanvas;

