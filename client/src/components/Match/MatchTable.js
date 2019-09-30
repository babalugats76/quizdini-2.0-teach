import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Table, Grid, Pagination } from 'semantic-ui-react';
import Message from '../UI/Message';
import Button from '../UI/Button';

const renderHtml = value => (
  <span dangerouslySetInnerHTML={{ __html: value.replace(/(^")|("$)/g, '') }} />
);

const renderRows = (
  matches,
  disabled,
  activePage,
  itemsPerPage,
  onMatchDelete
) => {
  return matches
    .filter((element, index) => {
      const start = activePage * itemsPerPage - itemsPerPage;
      const end = activePage * itemsPerPage - 1;
      // console.log('start vs. end', `${start} vs ${end}`);
      return index >= start && index <= end;
    })
    .map((val, idx) => {
      return (
        <Table.Row key={val.term}>
          <Table.Cell content={renderHtml(val.term)} />
          <Table.Cell content={renderHtml(val.definition)} />
          <Table.Cell collapsing>
            <Button
              title={`Delete ${val.term}`}
              type="button"
              disabled={disabled}
              icon="trash"
              onClick={(event, term) => onMatchDelete(event, val.term)}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
};

const renderPagination = (activePage, totalPages, onPageChange) => {
  return (
    <Pagination
      activePage={activePage}
      firstItem={null}
      lastItem={null}
      totalPages={totalPages}
      boundaryRange={1}
      siblingRange={1}
      onPageChange={(event, data) => onPageChange(event, data)}
    />
  );
};

const MatchTable = ({
  id,
  matches,
  activePage,
  itemsPerPage,
  disabled,
  error,
  onMatchDelete,
  onPageChange
}) => {
  const totalPages = Math.ceil(
    (matches.length ? matches.length : 0) / itemsPerPage
  );
  //console.log('Matches (length)', matches.length);
  //console.log('Total Pages', totalPages);
  //console.log('Active Page', activePage);
  const rows = renderRows(
    matches,
    disabled,
    activePage,
    itemsPerPage,
    onMatchDelete
  );
  const pagination = renderPagination(activePage, totalPages, onPageChange);
  return (
    <Segment id="match-table-container">
      <Grid columns={1}>
        {error && (
          <Grid.Row verticalAlign="bottom">
            <Grid.Column>
              <Message info content={error} />
            </Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row verticalAlign="top">
          <Grid.Column>
            <Table id={id} compact="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Term</Table.HeaderCell>
                  <Table.HeaderCell>Definition</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {matches.length > 0 ? (
                  rows
                ) : (
                  <Table.Row>
                    <Table.Cell>No matches...</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
        {totalPages > 1 ? (
          <Grid.Row verticalAlign="bottom">
            <Grid.Column textAlign="center">{pagination}</Grid.Column>
          </Grid.Row>
        ) : null}
      </Grid>
    </Segment>
  );
};

MatchTable.propTypes = {
  id: PropTypes.string.isRequired,
  matches: PropTypes.array,
  activePage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.any,
  onMatchDelete: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired
};

MatchTable.defaultProps = {};

export default MatchTable;