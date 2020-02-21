import React, { forwardRef } from "react";
import { Form, Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

const MyCheckbox = ({
  children,
  error,
  innerRef,  // needed to support forwardRef
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
        ref={innerRef} // as a prop, the ref needs to have a different name than 'ref'
        value={value}
        {...rest}
      />
    </Form.Field>
  );
};

MyCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  innerRef: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  rest: PropTypes.object,
  width: PropTypes.number
};

MyCheckbox.defaultProps = {};

export default forwardRef((props, ref) => (
  <MyCheckbox {...props} innerRef={ref} />
));
