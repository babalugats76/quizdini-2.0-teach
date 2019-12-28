import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

const MyCheckbox = ({
  children,
  error,
  name,
  onChange,
  value,
  width,
  ...rest
}) => {
  return (
    <Form.Field inline error={!!error} width={width}>
      <Checkbox
        id={name}
        label={<label htmlFor={name}>{children}</label>}
        name={name}
        onChange={onChange}
        type='checkbox'
        value={value}
        {...rest}
      />
    </Form.Field>
  );
};

MyCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  rest: PropTypes.object,
  width: PropTypes.number
};

MyCheckbox.defaultProps = {};

export default MyCheckbox;
export { MyCheckbox as Checkbox };
