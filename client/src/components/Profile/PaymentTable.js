import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import Link from '../UI/Link';

const { format } = require('date-fns');

const PaymentTable = ({ error, id, loading, payments }) => {
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
              {format(Date.parse(val.paymentDate), 'MMM d, yyyy, h:mm aa')}
            </Table.Cell>
            <Table.Cell>{val.description}</Table.Cell>
            <Table.Cell textAlign="center" collapsing>
              <Link
                title={`View ${val.processor} receipt ${val.paymentId}`}
                href={val.receiptUrl}
                target="_blank"
              >
                Receipt
              </Link>
            </Table.Cell>
          </Table.Row>
        );
      })
    );
  };

  if (error && !payments) {
    return (
      <div>
        Error! {error.message} {error.status}
      </div>
    );
  }

  if (loading && !payments) {
    return <h1>Loading...</h1>;
  }

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
  error: PropTypes.object,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  payments: PropTypes.array
};

export default PaymentTable;
