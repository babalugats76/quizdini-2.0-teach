import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Icon from './Icon';

const MyButton = ({ children, icon, type, ...rest }) => {
  return (
    <Button
      className={icon ? `${icon}` : null}
      icon={icon ? true : null}
      type={type} // Defaulting to type="submit"; all other must provide, e.g., type="button"
      {...rest}
    >
      {children}
      {icon && <Icon name={icon} />}
    </Button>
  );
};

MyButton.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  rest: PropTypes.object
};

MyButton.defaultProps = {
  type: 'submit' // Pass as="label" and provide events to simulate default type="button" behavior
};

export default MyButton;
export { MyButton as Button };
