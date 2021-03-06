import React from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Table } from 'semantic-ui-react';
import { useData } from '../../hooks/';
import { ErrorMessage, ExternalLink, Loader } from '../UI/';

const { format } = require('date-fns');

export default props => {
  const { data: payments, error, loading, initialized } = useData({
    url: '/api/payments',
    deps: []
  });

  // When to show loader
  const showLoader = !initialized && (loading || !payments);

  return (
    (error && <ErrorMessage details={error} />) ||
    (showLoader && <Loader />) || (
      <Container className="large" id="payments" fluid>
        <Segment id="payments">
          <PaymentTable id="payment-table" payments={payments} />
        </Segment>
      </Container>
    )
  );
};

const PaymentTable = ({ id, payments }) => {
  const renderRows = payments => {
    return (
      payments &&
      payments.map((val, idx) => {
        return (
          <Table.Row key={val.paymentId}>
            <Table.Cell
              textAlign="right"
              collapsing
            >{`${val.credits} credits`}</Table.Cell>
            <Table.Cell textAlign="right" collapsing>
              {val.formatted}
            </Table.Cell>
            <Table.Cell textAlign="right" collapsing>
              {val.paymentDate &&
                format(Date.parse(val.paymentDate), 'MMM d, yyyy, h:mm aa')}
            </Table.Cell>
            <Table.Cell>{val.description}</Table.Cell>
            <Table.Cell textAlign="center" collapsing>
              <ExternalLink href={val.receiptUrl} target="_blank">
                Receipt
              </ExternalLink>
            </Table.Cell>
          </Table.Row>
        );
      })
    );
  };

  const rows = renderRows(payments);

  return (
    payments && (
      <Table id={id} celled padded striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Item</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Amount</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Payment Date</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Description</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {payments.length > 0 ? (
            rows
          ) : (
            <Table.Row>
              <Table.Cell>No payments...</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )
  );
};

PaymentTable.propTypes = {
  id: PropTypes.string.isRequired,
  payments: PropTypes.array.isRequired
};

PaymentTable.defaultProps = {
  id: 'payment-table',
  payments: []
};
