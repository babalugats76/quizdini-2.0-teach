import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Segment } from 'semantic-ui-react';
import PaymentTable from './PaymentTable';

class Payment extends Component {
  componentDidMount() {
    const { fetchPayments } = this.props;
    fetchPayments();
  }

  render() {
    /* Added redux loading and error stuff here */
    const { paymentList } = this.props;
    return (
      <Segment id="payments" padded="very">
        <PaymentTable id="payment-table" {...paymentList} />
      </Segment>
    );
  }
}

const mapStateToProps = ({ paymentList }) => ({ paymentList });

export default connect(
  mapStateToProps,
  actions
)(Payment);
