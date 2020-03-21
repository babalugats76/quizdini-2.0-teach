import React, { forwardRef } from "react";
import { Form } from "semantic-ui-react";
import InputFeedback from "./InputFeedback";
import PropTypes from 'prop-types';
import TextareaAutosize from "react-textarea-autosize";

const ResponsiveTextArea = ({
  className,
  error,
  innerRef, // needed to support forwardRef
  label,
  maxLength,
  maxRows,
  minRows,
  name,
  onChange,
  required,
  type,
  value,
  width,
  ...rest
}) => {
  return (
    <Form.Field className={className} error={!!error} required={!!required} width={width}>
      {label && (
        <label htmlFor={name} style={{ textAlign: "left" }}>
          {label}
        </label>
      )}
      <TextareaAutosize
        autoCapitalize="off"
        autoComplete="off" 
        autoCorrect="off"
        id={name}
        maxLength={maxLength}
        minRows={minRows}
        maxRows={maxRows}
        name={name}
        onChange={onChange}
        ref={innerRef} // as a prop, the ref needs to have a different name than 'ref'
        type={type}
        spellCheck="false"
        value={value}
        {...rest}
      />
      <InputFeedback error={error} />
    </Form.Field>
  );
};

ResponsiveTextArea.defaultProps = {
  minRows: 1,
  maxRows: 2,
  required: false
}

ResponsiveTextArea.propTypes = {
    error: PropTypes.string,
    innerRef: PropTypes.any,
    label: PropTypes.string,
    minRows: PropTypes.number.isRequired,
    maxLength: PropTypes.number,
    maxRows: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    rest: PropTypes.object,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    width: PropTypes.number
  };

export default ResponsiveTextArea;
