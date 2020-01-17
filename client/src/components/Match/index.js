import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { useAPI, useData, useReduxData, useTitle } from "../../hooks/";
import { Loader } from "../UI/";
import MatchForm from "./MatchForm";

const Match = props => {
  const {
    location: { state: { matchId = undefined } = {} } = {},
    isMobile
  } = props;

  // local state - dirty toggle
  const [state, setState] = useState({
    dirty: false,
    matchId: matchId
  });

  // Redux data
  useReduxData({ items: ["fetchAuth"], deps: [state.dirty] });

  // API data
  const { data: game, error, initialized, loading } = useData({
    url: "/api/match/" + state.matchId,
    deps: [state.matchId, state.dirty]
  });

  // direct API interactions (ephemeral)
  const { POST: createMatch, PUT: updateMatch } = useAPI({ url: "/api/match" });

  // set page title
  useTitle({
    title: state.matchId
      ? game
        ? game.title
        : "Loading..."
      : "Create New Match",
    deps: [state.matchId]
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
  location: PropTypes.object.isRequired
};

export default Match;
