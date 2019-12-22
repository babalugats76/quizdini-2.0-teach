import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Table } from 'semantic-ui-react';
import { useAPI } from '../../hooks/';
import { ExternalLink, Loader } from '../UI/';

export default props => {
  // local state - track loading and API response
  const [state, setState] = useState({
    loading: false,
    response: null
  });

  // direct API interactions (ephemeral)
  const { GET: fetchPayments } = useAPI({
    url: '/api/payments'
  });

  // memoized load function
  const load = useCallback(async () => {
    setState(state => ({ ...state, loading: true }));
    const response = await fetchPayments();
    setState(state => ({ ...state, loading: false, response }));
  }, [fetchPayments, setState]);

  // fetch payments on mount only
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Destructure and rename data
  const { loading, response } = state;
  const { data: payments, error } = response || {};
  
  // When to show loader
  const showLoader = loading || !payments;

  return (
    (error && <pre>{JSON.stringify(error, null, 4)}</pre>) ||
    (showLoader && <Loader />) || (
      <Segment id="payments">
        <PaymentTable id="payment-table" payments={payments} />
      </Segment>
    )
  );
};

const { format } = require('date-fns');

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
