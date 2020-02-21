import React, { forwardRef } from 'react';
import { Form, Input } from 'semantic-ui-react';
import InputFeedback from './InputFeedback';
import PropTypes from 'prop-types';

const InputText = ({
  error,
  innerRef, // needed to support forwardRef
  label,
  maxLength,
  name,
  onChange,
  required,
  type,
  value,
  width,
  ...rest
}) => (
  <Form.Field error={!!error} required={!!required} width={width}>
    {label && (
      <label htmlFor={name} style={{ textAlign: 'left' }}>
        {label}
      </label>
    )}
    <Input
      id={name}
      maxLength={maxLength}
      name={name}
      onChange={onChange}
      ref={innerRef} // as a prop, the ref needs to have a different name than 'ref'
      type={type}
      value={value}
      {...rest}
    >
      <input />
    </Input>
    <InputFeedback error={error} />
  </Form.Field>
);

InputText.defaultProps = {
  required: false
};

InputText.propTypes = {
  error: PropTypes.string,
  innerRef: PropTypes.any,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  rest: PropTypes.object,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  width: PropTypes.number
};

export default forwardRef((props, ref) => (
  <InputText {...props} innerRef={ref} />
));
