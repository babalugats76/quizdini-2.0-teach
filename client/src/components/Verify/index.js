import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Verify extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { secret } = {} } = {} } = this.props;
    this.state = { secret };
  }

  async componentDidMount() {
    let message = {}; // return object
    const { secret } = this.state;
    const { verifyAccount } = this.props;
    await verifyAccount(secret);
    const { verify: { error, message: successMessage = '' } = {} } = this.props; // Get latest version of verify props (mapped from state)
    if (error) {
      const { message: errorMessage } = error;
      message = {
        color: 'red',
        content: `${errorMessage}`,
        header: 'Verification Unsuccessful'
      };
    } else {
      message = {
        color: 'green',
        content: `${successMessage}`,
        header: 'Verification Successful'
      };
    }
    return setTimeout(() => {
      this.props.history.push('/login', { message });
    }, 300);
  }

  render() {
    const { verify: { loading, error } = {} } = this.props;
    return !error && !loading && <div>Validating user...</div>;
  }
}

Verify.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      secret: PropTypes.string.isRequired
    })
  })
};

const mapStateToProps = ({ verify }) => ({ verify });

export default connect(
  mapStateToProps,
  actions
)(Verify);
