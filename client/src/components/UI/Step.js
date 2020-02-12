import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
import { Button, Icon } from '/';

const Step = ({
  children,
  errors,
  icon,
  onNext,
  onPrevious,
  show,
  step,
  title,
  ...rest
}) => {
  const incomplete = useCallback(() => {
    let innerFound = false;
    return React.Children.toArray(children).some(child => {
      if (child.type.name === 'FormGroup') {
        innerFound = React.Children.toArray(child.props.children).some(
          inner =>
            errors[inner.props.name] ||
            (inner.props.required && !inner.props.value)
        );
      }
      return (
        innerFound ||
        errors[child.props.name] ||
        (child.props.required && !child.props.value)
      );
    });
  }, [children, errors]);

  return show ? (
    <div className="step">
      {title && (
        <Divider horizontal section>
          <Header as="h4">
            <Icon name={icon} />
            <Header.Content>
              Step {step} - {title}
            </Header.Content>
          </Header>
        </Divider>
      )}
      {children}
      <div className="step-nav">
        {onPrevious && (
          <Button floated="left" onClick={onPrevious} type="button">
            BACK
          </Button>
        )}
        {onNext && (
          <Button
            disabled={incomplete()}
            floated="right"
            onClick={onNext}
            type="button"
          >
            NEXT
          </Button>
        )}
      </div>
    </div>
  ) : null;
};

Step.propTypes = {
  children: PropTypes.any.isRequired,
  errors: PropTypes.any,
  icon: PropTypes.string,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  show: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  title: PropTypes.string
};

Step.defaultProps = {
  step: 1
};

export default Step;
