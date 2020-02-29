import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../UI/';

const FlexTable = ({
  columns,
  disabled,
  id,
  onMatchDelete,
  matches,
  striped
}) => {
  const classes = [
    'flex-table',
    disabled ? ['disabled'] : [],
    striped ? ['striped'] : []
  ]
    .join(' ')
    .trim();

  const renderHtml = value => (
    <span
      dangerouslySetInnerHTML={{ __html: value.replace(/(^")|("$)/g, '') }}
    />
  );

  return (
    <div className="flex-table-wrapper">
      <div className="flex-table-header">Message Goes Here....</div>
      <table id={id} className={classes}>
        <thead>
          {Array.isArray(columns) && columns.length && (
            <tr>
              {columns.map((colhead, idx) => (
                <th key={idx}>
                  {colhead == '' ? <span>&nbsp;</span> : colhead}
                </th>
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
            <td>Information about the table</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

FlexTable.propTypes = {
  columns: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
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
