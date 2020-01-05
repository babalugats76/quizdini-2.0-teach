import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { useAPI, useData } from "../../hooks/";
import { Loader } from "../UI/";
import MatchForm from "./MatchForm";

const Match = props => {
  const {
    location: { state: { matchId = undefined } = {} } = {},
    isMobile
  } = props;

  // local state - dirty toggle
  const [state, setState] = useState({
    matchId: matchId,
    dirty: false
  });

  // toggles data as "dirty" (used to prompt fetch)
  const onSuccess = (matchId = null) => {
    setState(prevState => {
      return {
        matchId: prevState.matchId || matchId,
        dirty: !prevState.dirty
      };
    });
  };

  // direct API interactions (ephemeral)
  const { POST: createMatch, PUT: updateMatch } = useAPI({ url: "/api/match" });

  const { data: game, error, initialized, loading } = useData({
    url: "/api/match/" + state.matchId,
    deps: [state.matchId, state.dirty],
    debug: false
  });

  useEffect(() => {
    const { title = "Create Match Game" } = game || {};
    const pageTitle = [process.env.REACT_APP_WEBSITE_NAME, title].join(" | ");
    document.title = title && pageTitle;
  }, [game]);

  const showLoader = !initialized && (loading || !game);

  return (
    <Container as="main" className="page large" fluid id="match-edit">
      {(error && <pre>{JSON.stringify(error, null, 4)}</pre>) ||
        (showLoader && <Loader />) || (
          <div className="content-wrapper">
            <MatchForm
              game={game}
              isMobile={isMobile}
              loading={loading}
              maxMatches={100}
              onCreateMatch={createMatch}
              onSuccess={onSuccess}
              onUpdateMatch={updateMatch}
            />
          </div>
        )}
    </Container>
  );
};

Match.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

export default Match;
