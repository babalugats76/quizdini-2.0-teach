import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const MyMessage = ({ content, severity, ...rest }) => {
  return (
    <Message
      content={content}
      error={severity === 'ERROR' ? true : false}
      info={severity === 'INFO' ? true : false}
      success={severity === 'OK' ? true : false}
      warning={severity === 'WARN' ? true : false}
      {...rest}
    />
  );
};

MyMessage.propTypes = {
  content: PropTypes.any.isRequired
};

export default MyMessage;
export { MyMessage as Message };
