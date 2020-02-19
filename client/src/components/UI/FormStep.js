import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Divider, Header, Segment } from "semantic-ui-react";
import { Button, Icon } from "/";

const FormStep = ({ children, errors, icon, onNext, onPrevious, show, step, title }) => {
  const incomplete = useCallback(() => {
    let innerFound = false;
    return React.Children.toArray(children).some(child => {
      if (child.type.name === "FormGroup") {
        innerFound = React.Children.toArray(child.props.children).some(
          inner => inner.props.name in errors || (inner.props.required && !inner.props.value)
        );
      }
      return (
        innerFound || child.props.name in errors || (child.props.required && !child.props.value)
      );
    });
  }, [children, errors]);

  return show ? (
    <div className="form-step">
      {(onPrevious || onNext) && (
        <Segment as="header" attached="top">
          <nav>
            {onPrevious && (
              <Button floated="left" onClick={onPrevious} size="small" type="button">
                BACK
              </Button>
            )}
            {onNext && (
              <Button
                disabled={incomplete()}
                floated="right"
                onClick={onNext}
                size="small"
                type="button"
              >
                NEXT
              </Button>
            )}
          </nav>
        </Segment>
      )}
      <Segment as="section" attached="bottom" padded>
        <Divider horizontal section>
          <Header as="h4">
            <Icon name={icon} />
            <Header.Content>
              Step {step} - {title}
            </Header.Content>
          </Header>
        </Divider>
        {children}
      </Segment>
    </div>
  ) : null;
};

FormStep.propTypes = {
  children: PropTypes.any.isRequired,
  errors: PropTypes.any,
  icon: PropTypes.string,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  show: PropTypes.bool.isRequired,
  FormStep: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

FormStep.defaultProps = {
  FormStep: 1
};

export default FormStep;
