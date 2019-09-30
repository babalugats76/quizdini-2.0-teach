import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const MyMessage = ({ content, ...props }) => {
  return <Message content={content} {...props} />;
};

MyMessage.propTypes = {
  content: PropTypes.any.isRequired
};

export default MyMessage;
export { MyMessage as Message };
