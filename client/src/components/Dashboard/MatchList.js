import React from "react";
import PropTypes from "prop-types";
import MatchCardGroup from "./MatchCardGroup";

const MatchList = ({ error, loading, games, onMatchDelete }) => {
  if (error && !games) {
    return (
      <div>
        Error! {error.message} {error.status}
      </div>
    );
  }

  if (loading && !games) {
    return <h1>Loading...</h1>;
  }

  return <MatchCardGroup games={games} onMatchDelete={onMatchDelete} />;
};

MatchList.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  games: PropTypes.array
};

export default MatchList;
