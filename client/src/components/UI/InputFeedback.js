import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputFeedback = ({ error }) => {
  const classes = classnames('input-feedback', {
    error: !!error
  });
  return error ? <div className={classes}>{error}</div> : null;
};

InputFeedback.propTypes = {
  error: PropTypes.string
};

export default InputFeedback;
