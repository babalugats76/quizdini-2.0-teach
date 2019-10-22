import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../src/components/UI/Loader';
import MatchCardGroup from '../src/components/Dashboard/MatchCardGroup';


const MatchList = ({ games, onMatchDelete }) => {
  return <MatchCardGroup games={games} onMatchDelete={onMatchDelete} />
};

MatchList.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  games: PropTypes.array
};

export default MatchList;
