import React from "react";
import PropTypes from "prop-types";
import { Button, Message } from "../UI/";

const FlexTable = ({
  columns,
  disabled,
  error,
  id,
  onMatchDelete,
  matches,
  maxMatches,
  minMatches,
  striped
}) => {
  const classes = ["flex-table", disabled ? ["disabled"] : [], striped ? ["striped"] : []]
    .join(" ")
    .trim();

  const renderHtml = value => (
    <span dangerouslySetInnerHTML={{ __html: value.replace(/(^")|("$)/g, "") }} />
  );

  return (
    <div className="flex-table-wrapper">
      <table id={id} className={classes}>
        <thead>
          {Array.isArray(columns) && columns.length && (
            <tr>
              {columns.map((colhead, idx) => (
                <th key={idx}>{colhead === "" ? <span>&nbsp;</span> : colhead}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {matches.map((row, idx) => (
            <tr key={idx}>
              <td className="delete">
                <Button
                  type="button"
                  disabled={disabled}
                  icon="trash"
                  onClick={event => onMatchDelete(event, row.term)}
                />
              </td>
              {Object.entries(row).map(([colname, colval]) => (
                <td key={colname}>{renderHtml(colval)}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <Message
                content={
                  (error &&
                    `Add at least ${minMatches - matches.length} term${
                      minMatches - matches.length === 1 ? "" : "s"
                    }...`) || (
                    <span>
                      {matches.length} terms &#x2264; {maxMatches} max
                    </span>
                  )
                }
                severity="INFO"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

FlexTable.propTypes = {
  columns: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.any,
  id: PropTypes.string.isRequired,
  info: PropTypes.string,
  onMatchDelete: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired,
  striped: PropTypes.bool.isRequired
};

FlexTable.defaultProps = {
  columns: [],
  disabled: false,
  matches: [],
  striped: true
};

export default FlexTable;
