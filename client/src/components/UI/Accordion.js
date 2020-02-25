import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'semantic-ui-react';
import Icon from './Icon';

/**
 * Wraps Semantic UI's Accordion adding key functionality
 *
 * CSS styles can be found in site-level accordion.overrides file
 * Custom inline icons are used in lieu of Semantic's
 */

const MyAccordion = ({
  children,
  forceOpen,
  icon,
  index,
  onClick,
  open,
  title,
  ...rest
}) => {
  /**
   * Render children in wrapped Semantic Accordion component
   * Use custom Icon component throughout
   */
  return (
    <Accordion fluid {...rest}>
      <Accordion.Title
        active={open || forceOpen}
        index={index}
        onClick={(event, titleProps) => onClick(event, titleProps)}
      >
        <Icon name={icon} />
        {title}
        <Icon
          name="chevron-down"
          className={open || forceOpen ? 'open' : 'closed'}
        />
      </Accordion.Title>
      <Accordion.Content active={open || forceOpen}>
        {children}
      </Accordion.Content>
    </Accordion>
  );
};

MyAccordion.propTypes = {
  children: PropTypes.node,
  forceOpen: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

MyAccordion.defaultProps = {
  forceOpen: false,
  open: false
};

/* To get around namespace conflicts */
export default MyAccordion;
export { MyAccordion as Accordion };
