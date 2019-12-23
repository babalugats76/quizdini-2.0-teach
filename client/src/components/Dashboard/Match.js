import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Segment } from 'semantic-ui-react';
import { RouterButton } from '../UI/';
import MatchIntro from './MatchIntro';
import MatchCardGroup from './MatchCardGroup';

const Match = ({ credits, data: games, error, loading, onDelete }) => {
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
        <MatchCardGroup games={games} onMatchDelete={onDelete} />
      )) || <MatchIntro />}
    </Segment>
  );
};

Match.propTypes = {
  credits: PropTypes.number.isRequired,
  data: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired
};

export default Match;
