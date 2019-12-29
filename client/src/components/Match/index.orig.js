import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';
import Loader from '../UI/Loader';
import MatchForm from './MatchForm.orig';

class Match extends Component {
  // bind this way due to async/await arrow function bug in Babel
  handleSave = this.handleSave.bind(this);

  componentDidMount() {
    this.fetchMatch();
  }

  async fetchMatch() {
    const { fetchMatch } = this.props;
    const { state = {} } = this.props.location;
    const { matchId } = state;

    await fetchMatch(matchId);

    // Update title using match game info
    const {
      matchGame: { game: { title = 'Create Match Game' } = {} } = {}
    } = this.props;
    const pageTitle = [process.env.REACT_APP_WEBSITE_NAME, title].join(' | ');
    document.title = title && pageTitle;
  }

  async handleSave(values, actions) {
    const { upsertMatch, fetchAuth } = this.props; // Redux action
    const { setSubmitting, setStatus } = actions;
    const {
      duration,
      instructions,
      itemsPerBoard,
      colorScheme,
      matchId,
      matches,
      title
    } = values;
    const options = { duration, itemsPerBoard, colorScheme };

    await upsertMatch(matchId, {
      instructions,
      matches,
      options,
      title
    });

    const { matchGame = {} } = this.props;
    const { error, game = {} } = matchGame;
    const { message: errorMessage = '', code: errorCode = '' } = error || {};

    if (error) {
      switch (errorCode) {
        case 'InsufficientCredits':
          return this.props.history.push('/dashboard', {
            from: 'MATCH',
            message: {
              content: errorMessage,
              header: 'Not so fast!',
              severity: 'ERROR'
            },
            skipAuth: false
          });
        default:
          await setStatus({
            content: errorMessage,
            header: "Something's not quite right.",
            severity: 'ERROR'
          });

          return await setSubmitting(false);
      }
    }

    const newMatchId = game.matchId;

    if (newMatchId === this.props.location.state.matchId) {
      // Successful save
      return await setSubmitting(false);
    } else {
      // Successful create new
      fetchAuth(); // This is done here to show immediate reduction in credits
      // Wait and then redirect to self with newly created id from database
      setTimeout(() => {
        this.props.history.push('/match', { matchId: newMatchId });
      }, 300);
    }
  }

  render() {
    const { matchGame = {}, isMobile } = this.props;
    const { error, loading, game } = matchGame;

    if (error & !game) {
      return (
        <div>
          Error! {error.message} {error.status}
        </div>
      );
    }

    const showLoader = loading || !game;

    return (
      <Container as="main" className="page large" fluid id="match-edit">
        {(showLoader && <Loader />) || (
          <div className="content-wrapper">
            <MatchForm
              game={game}
              handleSave={(values, actions) => this.handleSave(values, actions)}
              isMobile={isMobile}
              loading={loading}
              maxMatches={100}
            />
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ matchGame }) => ({ matchGame });

Match.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, actions)(Match);
