import React from 'react';

export default class Map extends React.Component {
  render(){
    return(
      <path key={this.props.id} cs="100,100" d={this.props.d} aria-label={this.props.label} fill={this.props.color} ></path>
    )}
}
