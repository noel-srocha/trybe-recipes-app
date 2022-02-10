import PropTypes from 'prop-types';
import React from 'react';

function Input({ type, name, id, onChange, value, className, placeholder }) {
  return (
    <label htmlFor={ id }>
      <input
        type={ type }
        name={ name }
        data-testid={ id }
        id={ id }
        onChange={ onChange }
        value={ value }
        className={ className }
        placeholder={ placeholder }
      />
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
