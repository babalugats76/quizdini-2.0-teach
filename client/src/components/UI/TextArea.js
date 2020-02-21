import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';

const MyTextArea = ({
  innerRef, // needed to support forwardRef
  onChange,
  placeholder,
  value,
  ...rest
}) => {
  return (
    <TextArea
      onChange={(event, data) => onChange(event, data)}
      ref={innerRef} // as a prop, the ref needs to have a different name than 'ref'
      value={value || placeholder}
      {...rest}
    />
  );
};

MyTextArea.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default forwardRef((props, ref) => (
  <MyTextArea {...props} innerRef={ref} />
));
