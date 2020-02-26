import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Pagination,
  Table,
  Responsive,
  Segment
} from 'semantic-ui-react';
import Message from '../UI/Message';
import Button from '../UI/Button';

const MatchTable = ({
  activePage,
  disabled,
  error,
  id,
  itemsPerPage,
  matches,
  onMatchDelete,
  onPageChange
}) => {
  const renderHtml = value => (
    <span
      dangerouslySetInnerHTML={{ __html: value.replace(/(^")|("$)/g, '') }}
    />
  );

  const renderRows = ({
    activePage,
    disabled,
    itemsPerPage,
    matches,
    onMatchDelete
  }) => {
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

  const renderPagination = ({ activePage, onPageChange, totalPages }) => {
    return (
      <>
        <Responsive
          as={Pagination}
          activePage={activePage}
          firstItem={null}
          lastItem={null}
          maxWidth={767}
          totalPages={totalPages}
          boundaryRange={0}
          siblingRange={0}
          onPageChange={(event, data) => onPageChange(event, data)}
        />
        <Responsive
          as={Pagination}
          activePage={activePage}
          firstItem={null}
          lastItem={null}
          minWidth={768}
          totalPages={totalPages}
          boundaryRange={1}
          siblingRange={1}
          onPageChange={(event, data) => onPageChange(event, data)}
        />
      </>
    );
  };

  const totalPages = Math.ceil(
    (matches.length ? matches.length : 0) / itemsPerPage
  );
  //console.log('Matches (length)', matches.length);
  //console.log('Total Pages', totalPages);
  //console.log('Active Page', activePage);
  const rows = renderRows({
    activePage,
    disabled,
    itemsPerPage,
    matches,
    onMatchDelete
  });
  const pagination = renderPagination({
    activePage,
    onPageChange,
    totalPages
  });
  return (
    <div id={id}>
      <Grid columns={1}>
        {error && (
          <Grid.Row verticalAlign="bottom">
            <Grid.Column>
              <Message severity="INFO" content={error} />
            </Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row verticalAlign="top">
          <Grid.Column>
            <Table celled compact="very" striped>
              <Table.Header fullWidth>
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
    </div>
  );
};

MatchTable.propTypes = {
  activePage: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.any,
  id: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  matches: PropTypes.array,
  onMatchDelete: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired
};

MatchTable.defaultProps = {};

export default MatchTable;
