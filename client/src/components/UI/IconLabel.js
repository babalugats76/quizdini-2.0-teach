import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '.';

const IconLabel = ({ children, icon, ...rest }) => {
  return (
    <label className="icon-label" {...rest}>
      <Icon name={icon} />
      <span>{children}</span>
    </label>
  );
};

IconLabel.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string.isRequired
};

export default IconLabel;
