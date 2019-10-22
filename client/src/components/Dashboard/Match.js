import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Segment } from 'semantic-ui-react';
import RouterButton from '../UI/RouterButton';
import Loader from '../UI/Loader';
import MatchIntro from './MatchIntro';
import MatchCardGroup from './MatchCardGroup';

const Match = ({ credits, matchList, onMatchDelete }) => {
  const { error, loading, games } = matchList;

  if (error && !games) {
    return (
      <div>
        Error! {error.message} {error.status}
      </div>
    );
  }

  if (loading && !games) return <Loader />;

  return (
    <Segment id="match-game" padded>
      <RouterButton
        disabled={credits <= 0}
        labelPosition="left"
        icon="plus"
        pathname="/match"
        positive={credits >= 1}
        state={{ matchId: null }}
        title="Create a new match game"
      >
        NEW GAME
      </RouterButton>
      <Divider hidden />
      {(games && games.length && (
        <MatchCardGroup games={games} onMatchDelete={onMatchDelete} />
      )) || <MatchIntro />}
    </Segment>
  );
};

Match.propTypes = {
  credits: PropTypes.number.isRequired,
  matchList: PropTypes.object.isRequired,
  onMatchDelete: PropTypes.func.isRequired
};

export default Match;
