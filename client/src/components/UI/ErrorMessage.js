import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Image } from 'semantic-ui-react';

const ErrorMessage = ({ children, header }) => {
  return (
    <div className="error-wrapper transform-center">
      <div className="error-content p-4 m-4">
        <Image src="https://via.placeholder.com/215x275?text=Creative" />
        <Header>
          <Header.Content>{header}</Header.Content>
          {/* TODO: Interegate to see what kind of data and handle as approproate */}
          <Header.Subheader>{children}</Header.Subheader>
        </Header>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.any,
  header: PropTypes.string.isRequired
};

ErrorMessage.defaultProps = {
  header: 'Houston, We Have a Problem!'
};

export default ErrorMessage;
