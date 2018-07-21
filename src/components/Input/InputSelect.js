
import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.PureComponent {
  handleChange = (e) => {
    this.props.onChange(e.target);
  }

  renderOptions() {
    return this.props.options.map((x, i) => (
      <option
        key={`inputSelect_${i}`}
        value={x.value}
      >
        {x.label}
      </option>
    ));
  }

  render() {
    return (
      <span className='inputSelect'>
        <p>
          {this.props.name}
:
          {' '}
        </p>
        <select value={this.props.value} onChange={this.handleChange}>
          {this.renderOptions()}
        </select>
      </span>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string
};

export default Select;
