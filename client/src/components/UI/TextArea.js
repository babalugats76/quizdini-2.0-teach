import React from "react";
import PropTypes from "prop-types";
import { TextArea } from "semantic-ui-react";

const MyTextArea = ({ value, placeholder, onChange, ...props }) => {
  return (
    <TextArea
      value={value || placeholder}
      onChange={(event, data) => onChange(event, data)}
      {...props}
    />
  );
};

MyTextArea.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextArea;
export { MyTextArea as TextArea };
