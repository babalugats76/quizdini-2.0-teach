import React from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import TextArea from '../UI/TextArea';
import InputFile from '../UI/InputFile';

const MatchBulk = ({
  dirty,
  disabled,
  maxMatches,
  onBulkChange,
  onFileChange,
  onUpdateMatches,
  rows,
  value
}) => {
  return (
    <>
      <div id="btn-group-bulk-match">
        <Button
          as="label"
          title="Update Bank of Matches"
          icon="update"
          size="tiny"
          type="button"
          tabIndex={-1}
          disabled={disabled || !dirty}
          positive={dirty}
          onClick={event => onUpdateMatches(event)}
          labelPosition="right"
        >
          Update
        </Button>
        <InputFile
          id="input-match-file"
          label="Upload"
          labelPosition="right"
          disabled={disabled}
          onChange={event => onFileChange(event)}
          size="tiny"
        />
      </div>
      <TextArea
        value={value}
        onChange={(event, data) => onBulkChange(event, data)}
        rows={rows}
        disabled={disabled}
      />
      <br />
      <div className="match-tip">Maximum # of terms = {maxMatches}</div>
      <div className="match-tip">
        For special characters, use quotes:&nbsp;&nbsp;
        <code>"a,b,c"</code>
      </div>
    </>
  );
};

MatchBulk.defaultProps = {
  rows: 10
};

MatchBulk.propTypes = {
  disabled: PropTypes.bool,
  maxMatches: PropTypes.number.isRequired,
  onBulkChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onUpdateMatches: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired
};

export default MatchBulk;
