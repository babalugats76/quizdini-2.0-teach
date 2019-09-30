import React from 'react';
import PropTypes from 'prop-types';

const LoadError = ({ error }) => {
  return (
    <pre>{error}</pre>
  );
};

LoadError.propTypes = {
  error: PropTypes.string
};

export default LoadError;