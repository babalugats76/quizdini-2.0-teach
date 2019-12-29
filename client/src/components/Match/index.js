import React, { useEffect, useState } from 'react';
import { useData } from '../../hooks/';
import { Loader } from '../UI/';
import MatchForm from './MatchForm';

export default props => {
  const { location: { state: { matchId = undefined } = {} } = {} } = props;

  // local state - dirty toggle
  const [state, setState] = useState({
    matchId: matchId,
    dirty: false
  });

  const { data: game, error, initialized, loading, reset } = useData({
    url: '/api/match/' + state.matchId,
    deps: [state.matchId, state.dirty],
    debug: true
  });

  useEffect(() => {
    console.log('page title updating...');
    const { title = 'Create Match Game' } = game || {};
    const pageTitle = [process.env.REACT_APP_WEBSITE_NAME, title].join(' | ');
    document.title = title && pageTitle;
  }, [game]);

  const showLoader = !initialized && (loading || !game);

  return (showLoader && <Loader />) || <MatchForm game={game} />;
};
