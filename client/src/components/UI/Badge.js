import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '/';

const Badge = ({ icon }) => {
  return (
    <div className="badge">
      <Icon name={icon} />
    </div>
  );
};

Badge.defaultProps = {
  icon: 'question'
};

Badge.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Badge;
