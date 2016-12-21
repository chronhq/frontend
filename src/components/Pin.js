import React from 'react';

export default class Pin extends React.Component {
  render(){
    let location = this.props.location;
    return <circle cx={location.cx} cy={location.cy} r="10" stroke="Black" stroke-width="1" fill="Blue" ><title>{location.name}</title></circle>;
  }
}
