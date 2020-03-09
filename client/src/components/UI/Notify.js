import React from 'react';
import { Message } from 'semantic-ui-react';

const Notify = ({
  content = null,
  header = null,
  onDismiss = null,
  severity = null
}) => {
  return (
    <Message
      header={header}
      hidden={!content}
      content={content}
      onDismiss={onDismiss}
      error={severity === 'ERROR' ? true : false}
      info={severity === 'INFO' ? true : false}
      success={severity === 'OK' ? true : false}
      warning={severity === 'WARN' ? true : false}
    />
  );
};

export default Notify;
