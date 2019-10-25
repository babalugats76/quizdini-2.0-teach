import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Segment } from 'semantic-ui-react';
import Loader from '../UI/Loader';
import PaymentTable from './PaymentTable';

class Payment extends Component {
  componentDidMount() {
    const { fetchPayments } = this.props;
    fetchPayments();
  }

  render() {
    const { paymentList: { error, loading, payments } = {} } = this.props;
    if (error && !payments) return <div>Error!</div>;
    const showLoader = loading || !payments;

    return (
      (showLoader && <Loader />) || (
        <Segment id="payments">
          <PaymentTable id="payment-table" payments={payments} />
        </Segment>
      )
    );
  }
}

const mapStateToProps = ({ paymentList }) => ({ paymentList });

export default connect(
  mapStateToProps,
  actions
)(Payment);
