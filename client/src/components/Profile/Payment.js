import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Table } from 'semantic-ui-react';
import { useData } from '../../hooks/';
import { ExternalLink, Loader } from '../UI/';

const { format } = require('date-fns');

export default props => {
  const { data: payments, error, loading, initialized } = useData({
    url: '/api/payments',
    deps: []
  });

  // When to show loader
  const showLoader = !initialized && (loading || !payments);

  return (
    (error && <pre>{JSON.stringify(error, null, 4)}</pre>) ||
    (showLoader && <Loader />) || (
      <Segment id="payments">
        <PaymentTable id="payment-table" payments={payments} />
      </Segment>
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
              <ExternalLink
                title={`View ${val.processor} receipt ${val.paymentId}`}
                href={val.receiptUrl}
                target="_blank"
              >
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
