import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';
import Loader from '../UI/Loader';
import MatchForm from './MatchForm';

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
    // TODO empty match logic and handling
    const {
      matchGame: { game: { title = 'Create Match Game' } = {} } = {}
    } = this.props;
    const pageTitle = [process.env.REACT_APP_WEBSITE_NAME, title].join(' | ');
    document.title = title && pageTitle;
  }

  async handleSave(values, actions) {
    const { upsertMatch } = this.props; // Redux action
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

    await setStatus(null); // Clear form status

    await upsertMatch(matchId, {
      instructions,
      matches,
      options,
      title
    });

    const { matchGame = {} } = this.props;
    const { error, game = {} } = matchGame;

    if (error) {
      const {
        message: { errorMessage }
      } = error;

      /*if (error) {
        // If error in processing, e.g., insufficient credits
        await setStatus({
          color: 'red',
          message: error.message || null
        });
        return await setSubmitting(false);
      }*/

      this.props.history.push('/dashboard', {
        message: {
          color: 'red',
          content: errorMessage,
          header: 'Unable to Save Game'
        },
        from: 'MATCH'
      });
      return await setSubmitting(false);
    }

    const newMatchId = game.matchId;
    if (newMatchId === this.props.location.state.matchId) {
      return await setSubmitting(false);
    } else {
      /**
       * Either use this.props.history.push("/match", { matchId: newMatchId });
       * Or, render a redirect, being sure to set the state flag back to false
       * in the componentDidUpdate lifecycle method by referring to prevState argument (the second argument)
       */
      setTimeout(() => {
        // Wait and then redirect to self with newly created id from database
        this.props.history.push('/match', { matchId: newMatchId });
      }, 300);
    }
  }

  render() {
    const { matchGame = {}, isMobile } = this.props;
    const { error, loading, game } = matchGame;

    if (error) {
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
          <MatchForm
            game={game}
            handleSave={(values, actions) => this.handleSave(values, actions)}
            isMobile={isMobile}
            loading={loading}
            maxMatches={100}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ matchGame }) => ({ matchGame });

Match.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  actions
)(Match);
