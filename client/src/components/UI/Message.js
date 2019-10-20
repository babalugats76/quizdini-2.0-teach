import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const MyMessage = ({ content, ...rest }) => {
  return <Message content={content} {...rest} />;
};

MyMessage.propTypes = {
  content: PropTypes.any.isRequired
};

export default MyMessage;
export { MyMessage as Message };
