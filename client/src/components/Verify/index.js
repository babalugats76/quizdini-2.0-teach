import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loader from '../UI/Loader';

class Verify extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { secret } = {} } = {} } = this.props;
    this.state = { secret };
  }

  async componentDidMount() {
    let message = {};
    const { secret } = this.state;
    const { verifyAccount } = this.props;

    await verifyAccount(secret);

    const { accountVerify: { data, error } = {} } = this.props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};

    if (error) {
      message = {
        content: errorMessage,
        header: 'Check yourself...',
        severity: 'ERROR'
      };
    } else {
      message = {
        content: successMessage,
        header: 'Success!',
        severity: 'OK'
      };
    }
    return setTimeout(() => {
      this.props.history.push('/login', { message });
    }, 300);
  }

  render() {
    const { accountVerify: { loading, error } = {} } = this.props;
    const showLoader = !error || loading;
    return showLoader && <Loader />;
  }
}

Verify.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      secret: PropTypes.string.isRequired
    })
  })
};

const mapStateToProps = ({ accountVerify }) => ({ accountVerify });

export default connect(mapStateToProps, actions)(Verify);
