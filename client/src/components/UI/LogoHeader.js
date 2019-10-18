import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import logo from '../../logo.svg';

const LogoHeader = ({
  children,
  className,
  image,
  size,
  textAlign,
  ...rest
}) => (
  <Header
    className={className}
    content={children}
    image={image}
    size={size}
    textAlign={textAlign}
    {...rest}
  />
);

LogoHeader.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  size: PropTypes.string.isRequired,
  textAlign: PropTypes.string.isRequired
};

LogoHeader.defaultProps = {
  children: 'Quizdini',
  className: 'logo',
  image: logo,
  size: 'large',
  textAlign: 'center'
};

export default LogoHeader;
