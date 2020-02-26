import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const InputFile = ({ id, label, disabled, onChange, ...rest }) => {
  let fileInputRef = null; // Ref to hidden file input

  /**
   * Reset value of file input to null.
   * Attached to file input button.
   * Without, you cannot re-select a file.
   *
   * @param {Event} event Event to handle, i.e., click on file input's corresponding button
   */
  const handleClick = event => {
    fileInputRef.value = null; // Clear file input (to allow file re-select)
  };

  return (
    <>
      <Button
        as="label"
        disabled={disabled}
        htmlFor={id}
        icon="upload"
        onClick={event => handleClick(event)}
        type="button"
        {...rest}
      >
        {label}
      </Button>
      <input
        id={id}
        hidden
        accept={'.csv, .txt'}
        type="file"
        ref={ref => {
          fileInputRef = ref;
        }} // Attach element ref to local variable
        onChange={onChange}
      />
    </>
  );
};

InputFile.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default InputFile;
