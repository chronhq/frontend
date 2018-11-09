import React from 'react';
import Slider from 'rc-slider';

export default class InputRange extends React.Component {
  render() {
    return (
      <div>
        <Slider
          type='range'
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          step={1}
          onChange={(value) => {
            this.props.cb({ [this.props.name]: Number(value) });
          }}
        />
      </div>
    );
  }
}
