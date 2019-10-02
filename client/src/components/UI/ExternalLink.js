import React from "react";
import PropTypes from "prop-types";

/***
 * Used for external links, not internal links, e.g, react-router
 */
const ExternalLink = ({ children, href, target, ...rest }) => (
  <a href={href} target={target} {...rest}>
    {children}
  </a>
);

ExternalLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  rest: PropTypes.object
};

export default ExternalLink;
