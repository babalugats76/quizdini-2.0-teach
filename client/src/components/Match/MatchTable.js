import React from "react";
import PropTypes from "prop-types";
import { Button, Transition } from "../UI";

/* Return nested objects for these states: 'default', 'entering', 'entered', 'exiting', 'exited' */

const getTransitionStyles = wait => {
  return {
    default: { opacity: 0 },
    entering: {
      opacity: 0,
      transition: `opacity ${wait}ms ease`
    },
    entered: {
      opacity: 1.0,
      transition: `opacity ${wait}ms ease`
    },
    exiting: {},
    exited: {}
  };
};

const MatchTable = ({
  columns,
  disabled,
  error,
  id,
  onMatchDelete,
  matches,
  maxMatches,
  minMatches,
  striped,
  wait
}) => {
  const classes = ["flex-table"]
    .concat(disabled ? ["disabled"] : [], striped ? ["striped"] : [])
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
          {error && (
            <tr>
              <th colSpan={columns.length}>
                <Transition
                  appear={true}
                  component={null}
                  in={true}
                  key={matches.length}
                  timeout={wait}
                  transitionStyles={getTransitionStyles(wait)}
                  unmountOnExit={false}
                  mountOnEnter={true}
                >
                  <div>
                    Add at least {minMatches - matches.length} more term
                    {minMatches - matches.length === 1 ? "" : "s"}...
                  </div>
                </Transition>
              </th>
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
            <td>
              <Transition
                appear={true}
                component={null}
                in={true}
                key={matches.length}
                timeout={wait}
                transitionStyles={getTransitionStyles(wait)}
                unmountOnExit={false}
                mountOnEnter={true}
              >
                <span className="term-count">{matches.length}</span>
              </Transition>
              &nbsp;terms&nbsp;
              <span className={matches.length === maxMatches ? "at-max" : "max"}>
                /&nbsp;{maxMatches}&nbsp;max
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

MatchTable.propTypes = {
  columns: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.any,
  id: PropTypes.string.isRequired,
  info: PropTypes.string,
  onMatchDelete: PropTypes.func.isRequired,
  matches: PropTypes.array.isRequired,
  maxMatches: PropTypes.number.isRequired,
  minMatches: PropTypes.number.isRequired,
  striped: PropTypes.bool.isRequired,
  wait: PropTypes.number.isRequired
};

MatchTable.defaultProps = {
  columns: [],
  disabled: false,
  matches: [],
  minMatches: 9,
  maxMatches: 100,
  striped: true,
  wait: 250
};

export default MatchTable;
