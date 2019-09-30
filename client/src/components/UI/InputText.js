import React from "react";
import { Form, Input, Label } from "semantic-ui-react";
import InputFeedback from "./InputFeedback";
import PropTypes from "prop-types";

const InputText = ({
  countLetters,
  error,
  label,
  maxLength,
  name,
  onChange,
  required,
  type,
  value,
  width,
  ...rest
}) => {
  return (
    <React.Fragment>
      <Form.Field error={!!error} required={!!required} width={width}>
        {label && (
          <label htmlFor={name} style={{ textAlign: "left" }}>
            {label}
          </label>
        )}
        <Input
          id={name}
          maxLength={maxLength}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
          {...rest}>
          {countLetters && <Label floating>blah</Label>}
          <input />
        </Input>
        <InputFeedback error={error} />
      </Form.Field>
    </React.Fragment>
  );
};

InputText.defaultProps = {
  countLetters: false,
  required: false
};

InputText.propTypes = {
  countLetters: PropTypes.bool.isRequired,
  error: PropTypes.string,
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

export default InputText;

//const txtPct = ((maxlength - value.length) / maxlength) * 100;

/*
  const floatingLabel = {
    position: 'absolute',
    top: '-10px',
    right: '-20px',
    fontSize: '.8em',
    backgroundColor: 'rgba(128, 128, 128, .8)',
    borderRadius: '3px',
    padding: '3px',
    color: 'white',
    lineHeight: '1.1',
    textAlign: 'right',
    fontWeight: 'bold'
  };*/

/*const warningStyle = {
    backgroundColor: 'yellow',
    color: 'grey'
  };*/

/*const dangerStyle = {
    backgroundColor: 'red',
    color: 'white'
  };*/

/* <Label as='label'>{label}</Label>*/

/*<Label floating size='small' color='grey'>
            {value.length}/{maxlength}
          </Label>
          <input />*/

// eslint-disable-next-line
//const maxWidth = maxLength ? `${maxLength}ch` : null;

//style={{ boxSizing: 'inherit', maxWidth }}
