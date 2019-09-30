import React from "react";
import { Card } from "semantic-ui-react";
import MatchCard from "./MatchCard";

const MatchCardGroup = ({ games, onMatchDelete }) => {
  const renderCards = (games, onMatchDelete) => {
    return (
      games &&
      games.map((game, idx) => {
        return (
          <MatchCard
            key={game.matchId}
            game={game}
            onMatchDelete={matchId => onMatchDelete(game.matchId)}
          />
        );
      })
    );
  };

  const cards = renderCards(games, onMatchDelete);

  return (
    <Card.Group stackable itemsPerRow={3}>
      {cards}
    </Card.Group>
  );
};

export default MatchCardGroup;
