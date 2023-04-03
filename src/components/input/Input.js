import React from 'react';
import classes from './Input.module.css';
// eslint-disable-next-line
import PropTypes from 'prop-types';

/**
 * Stylized input component
 * @date 3/22/2023 - 3:36:04 PM
 *
 * @param {{ label: string; type: string; value: string; onChange: func; required?: boolean; }} {
  label, type, value, onChange, required = false,
}
 * @returns React Component
 */
function Input({
  label, type, value, onChange, required = false
}) {
  return (
    <div className="row">
      <label className={`${classes.label} col-3 text-start`} htmlFor={label}>
        {label}
      </label>
      <input
        className={`${classes.input} col-9`}
        type={type}
        checked={type === 'checkbox' && value}
        id={label}
        name={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired
};
