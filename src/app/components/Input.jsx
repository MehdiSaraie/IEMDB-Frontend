import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ value, placeholder, type, className, onChange, ...rest }) => (
    <input
        value={value}
        type={type}
        dir='rtl'
        className={`form-control ${className}`}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
    />
);

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

Input.defaultProps = {
    value: '',
    placeholder: '',
    type: 'text',
    className: '',
    onChange: () => {},
};

export default Input;
