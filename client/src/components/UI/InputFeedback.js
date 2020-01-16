import React from "react";
import PropTypes from "prop-types";

const InputFeedback = ({ error }) => {
  const classes = ["input-feedback", !!error ? ["error"] : []].join(" ").trim();
  return error ? <div className={classes}>{error}</div> : null;
};

InputFeedback.propTypes = {
  error: PropTypes.string
};

export default InputFeedback;
