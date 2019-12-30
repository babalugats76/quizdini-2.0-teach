import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { useData } from '../../hooks/';
import { Loader } from '../UI/';
import MatchForm from './MatchForm';

export default props => {
  const {
    location: { state: { matchId = undefined } = {} } = {},
    isMobile
  } = props;

  // local state - dirty toggle
  const [state, setState] = useState({
    matchId: matchId,
    dirty: false
  });

  const { data: game, error, initialized, loading, reset } = useData({
    url: '/api/match/' + state.matchId,
    deps: [state.matchId, state.dirty],
    debug: false
  });

  useEffect(() => {
    const { title = 'Create Match Game' } = game || {};
    const pageTitle = [process.env.REACT_APP_WEBSITE_NAME, title].join(' | ');
    document.title = title && pageTitle;
  }, [game]);

  const showLoader = !initialized && (loading || !game);

  return (
    <Container as="main" className="page large" fluid id="match-edit">
      {(showLoader && <Loader />) || (
        <div className="content-wrapper">
          <MatchForm game={game} isMobile={isMobile} maxMatches={100} />
        </div>
      )}
    </Container>
  );
};
