import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image } from 'semantic-ui-react';

const renderDetails = details => {
  if (Array.isArray(details) && details.length) {
    return (
      <div className="error-details">
        {details.map(el =>
          Object.entries(el).map(([key, value]) => (
            <pre key={key}>
              {key}: {value}
            </pre>
          ))
        )}
      </div>
    );
  }
  return (
    <div className="error-details">
      <pre>{details}</pre>
    </div>
  );
};

const ErrorMessage = ({ header, details }) => {
  return (
    <div className="d-flex flex-1 h-auto flex-justify-center flex-center-items">
      <div className="error-message p-4 m-4">
        <Image
          centered
          src="https://via.placeholder.com/280x280?text=Creative"
        />
        <Header size="large" textAlign="center">
          <Header.Content>{header}</Header.Content>
        </Header>
        {/* TODO: Interegate to see what kind of data and handle as approproate */}
        {renderDetails(details)}
      </div>
    </div>
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
