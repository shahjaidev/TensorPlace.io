import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type = 'checkbox', name, label, checked = false, onChange }) => (
  <label className="checkbox-inline">
    <input
      type={type}
      name={name}
      checked={checked}
      onChange={onChange}
      className="form-control"
    />
    <span className="checkbox-decorator">
      <span className="check"></span>
    </span> {label}
  </label>
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox;