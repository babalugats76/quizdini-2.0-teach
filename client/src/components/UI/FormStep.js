import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Divider, Header } from "semantic-ui-react";
import { Button, Icon } from "/";

const scrollTop = () => {
  typeof window !== "undefined" &&
    window.document &&
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
};

const FormStep = ({ children, errors, icon, onNext, onPrevious, show, step, title, ...rest }) => {
  useEffect(() => {
    show && scrollTop();
  }, [show]);

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
      <Divider horizontal section>
        <Header as="h4">
          <Icon name={icon} />
          <Header.Content>
            Step {step} - {title}
          </Header.Content>
        </Header>
      </Divider>
      {children}
      {(onPrevious || onNext) && (
        <nav>
          {onPrevious && (
            <Button floated="left" onClick={onPrevious} type="button">
              BACK
            </Button>
          )}
          {onNext && (
            <Button disabled={incomplete()} floated="right" onClick={onNext} type="button">
              NEXT
            </Button>
          )}
        </nav>
      )}
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
