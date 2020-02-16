import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import { Icon } from './';

const MyLabel = ({ children, icon, ...rest }) => {
  return (
    <Label as="span" {...rest}>
      <Icon name={icon} />
      <Label.Detail as="span">{children}</Label.Detail>
    </Label>
  );
};

MyLabel.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string.isRequired
};

export default MyLabel;
export { MyLabel as Label };
