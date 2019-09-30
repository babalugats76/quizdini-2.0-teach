import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import InputFeedback from './InputFeedback';
import PropTypes from 'prop-types';

const MyDropdown = ({
  error,
  label,
  name,
  options,
  required,
  setFieldValue,
  width,
  value,
  ...rest
}) => {
  const onChange = (event, data) => {
    event.preventDefault();
    setFieldValue(name, data.value);
  };

  return (
    <Form.Field error={!!error} required={!!required} width={width}>
      {label && (
        <label htmlFor={name} style={{ textAlign: 'left' }}>
          {label}
        </label>
      )}
      <Dropdown
        error={!!error}
        id={name}
        lazyLoad
        name={name}
        onChange={(event, data) => onChange(event, data)}
        options={options}
        value={value}
        {...rest}
      />
      <InputFeedback error={error} />
    </Form.Field>
  );
};

MyDropdown.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  rest: PropTypes.object,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.any,
  width: PropTypes.number
};

MyDropdown.defaultProps = {
  required: false
};

export default MyDropdown;
export { MyDropdown as Dropdown };
