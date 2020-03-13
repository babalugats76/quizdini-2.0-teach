import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAPI, useAuth, useData, useTitle } from "../../hooks";
import { ErrorMessage, Loader } from "../UI";
import MatchForm from "./MatchForm";

const MatchEdit = props => {
  // destructure key props
  const { location: { state: { matchId = undefined } = {} } = {}, isMobile } = props;

  // local state
  const [state] = useState({
    matchId: matchId
  });

  // API data
  const { data: game, error, initialized, loading } = useData({
    url: "/api/match/" + state.matchId,
    deps: []
  });

  // direct API interactions (ephemeral)
  const { POST: createMatch, PUT: updateMatch } = useAPI({ url: "/api/match" });

  // set page title
  useTitle({
    title: state.matchId ? (game ? game.title : "Loading...") : "Create New Match",
    deps: [state.matchId]
  });

  // used to refresh redux store with initial auth
  const fetchAuth = useAuth();

  // upon successful creation of a new game
  const onSuccess = () => {
    fetchAuth(); // updates redux store (to update credits)
  };

  // when to show loader
  const showLoader = !initialized && (loading || !game);

  return (
    (error && <ErrorMessage details={error} />) ||
    (showLoader && <Loader />) || (
      <MatchForm
        game={game}
        isMobile={isMobile}
        loading={loading}
        maxMatches={100}
        onCreateMatch={createMatch}
        onSuccess={onSuccess}
        onUpdateMatch={updateMatch}
      />
    )
  );
};

MatchEdit.propTypes = {
  location: PropTypes.object.isRequired
};

export default MatchEdit;
