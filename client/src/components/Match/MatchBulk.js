import React from "react";
import PropTypes from "prop-types";
import { Responsive } from "semantic-ui-react";
import { Button, TextArea, InputFile } from "../UI/";

const MatchBulk = ({
  dirty,
  disabled,
  maxMatches,
  onBulkChange,
  onBulkPopup,
  onFileChange,
  onUpdateMatches,
  popup,
  rows,
  value
}) => {
  return (
    <>
      <div className="clearfix" id="bulk-match-btns">
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
          disabled={disabled}
          id="input-match-file"
          label="Upload"
          labelPosition="right"
          onChange={event => onFileChange(event)}
          size="tiny"
        />
        <Responsive
          as={Button}
          icon={popup ? "minimize" : "maximize"}
          id="bulk-popout"
          minWidth={768}
          onClick={onBulkPopup}
          type="button"
        />
      </div>
      <TextArea
        value={value}
        onChange={(event, data) => onBulkChange(event, data)}
        rows={rows}
        disabled={disabled}
      />
      <br />
      <div className="match-tip">
        Maximum # of terms = {maxMatches}
        <br />
        For special characters, use quotes:&nbsp;<code>"a,b,c"</code>
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
  onBulkPopup: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onUpdateMatches: PropTypes.func.isRequired,
  popup: PropTypes.bool.isRequired,
  rows: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired
};

export default MatchBulk;
