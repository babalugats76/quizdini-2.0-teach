import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from './Button';

const RouterButton = ({
  children,
  pathname,
  state,
  match,
  location,
  history,
  staticContext,
  ...rest
}) => {
  return (
    <Button
      type="button"
      onClick={() => {
        history.push(pathname, state);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

RouterButton.defaultProps = {
  type: 'button',
  state: {}
};

RouterButton.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  state: PropTypes.object,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(RouterButton);
