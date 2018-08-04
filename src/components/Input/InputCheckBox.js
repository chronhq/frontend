import React from 'react';

const InputCheckBox = ({name, checked, label, cb, disabled = false }) => (
  <label
    htmlFor={name}
    className={disabled ? 'checkbox--disabled' : ''}
    onChange={(e) => {
      cb({ [name]: Number(e.target.checked) });
    }}
  >
    <span>
      <input
        id={name}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          cb({ [name]: Number(e.target.checked) });
        }}
      />
      <span />
    </span>
    {label}
  </label>
);

export default InputCheckBox;
