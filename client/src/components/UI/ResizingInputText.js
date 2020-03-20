import React, { forwardRef } from 'react';
import AutosizeInput from 'react-input-autosize';
import PropTypes from 'prop-types';

const ResizingInputText = ({
  innerRef, // needed to support forwardRef,
  name,
  onChange,
  styles,
  value,
  ...rest
}) => {
  return (
    <AutosizeInput
      name={name}
      onChange={onChange}
      ref={innerRef} // as a prop, the ref needs to have a different name than 'ref'
      style={styles}
      value={value}
      {...rest}
    />
  );
};

export default forwardRef((props, ref) => (
  <ResizingInputText {...props} innerRef={ref} />
));
