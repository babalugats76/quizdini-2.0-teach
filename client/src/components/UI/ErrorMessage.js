import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Segment } from 'semantic-ui-react';
import { Modal } from './';
import logo from '../../logo.svg';

const renderDetails = details => {
  if (Array.isArray(details) && details.length) {
    return (
      <div className="error-details">
        {details.map(el =>
          Object.entries(el).map(([key, value]) => (
            <>{key}: {value}<br/></>
          ))
        )}
      </div>
    );
  }
};

const ErrorMessage = ({ header, details }) => {
  return (
    <Modal id="error" show={true}>
      <Segment className="error-message modal-content" padded="very">
        <Image src={logo} />
        <Header size="large" textAlign="center">
          <Header.Content>{header}</Header.Content>
        </Header>
        {/* TODO: Interegate to see what kind of data and handle as approproate */}
        {renderDetails(details)}
      </Segment>
    </Modal>
  );
};

ErrorMessage.propTypes = {
  details: PropTypes.any.isRequired,
  header: PropTypes.string.isRequired
};

ErrorMessage.defaultProps = {
  details: 'No details...',
  header: 'Houston, we have a problem...'
};

export default ErrorMessage;
