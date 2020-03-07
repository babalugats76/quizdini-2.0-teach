import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, Segment, Transition } from 'semantic-ui-react';
import { useTimeout } from '../../hooks';
import { Button, Icon, Label, RouterButton } from '../UI';
import { copyToClipboard } from './utils';
const { formatDistanceToNow } = require('date-fns');

const Match = ({ credits, data: games, onDelete }) => {
  return (
    <section id="match-games">
      <Segment vertical>
        <RouterButton
          disabled={credits <= 0}
          pathname="/match"
          primary={credits >= 1}
          state={{ matchId: null }}
        >
          New Game
        </RouterButton>
      </Segment>
      {(games && games.length && (
        <MatchCardGroup games={games} onDelete={onDelete} />
      )) || <MatchIntro />}
    </section>
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

const MatchIntro = () => (
  <Segment vertical>
    <h1>The Match Game...</h1>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </Segment>
);

const MatchCardGroup = ({ games, onDelete }) => {
  return (
    <Card.Group as={Segment} itemsPerRow={3} doubling stackable vertical>
      {games &&
        games.map(game => (
          <MatchCard
            key={game.matchId}
            game={game}
            onDelete={matchId => onDelete(game.matchId)}
          />
        ))}
    </Card.Group>
  );
};

MatchCardGroup.propTypes = {
  games: PropTypes.array,
  onDelete: PropTypes.func.isRequired
};

const MatchCard = ({ game, onDelete }) => {
  const [state, setState] = useState({
    canDelete: false,
    visible: true
  });

  const [copied, setCopied] = useTimeout(2000);
  const { matchId, termCount, title, updateDate } = game;
  const { canDelete, visible } = state;

  const handleMouseLeave = () => {
    setState(prevState => {
      return {
        ...prevState,
        canDelete: false
      };
    });
  };

  const handleDelete = () => {
    // First click enables deletion capability
    // Second click triggers deletion by setting visible -> false
    setState(prevState => {
      return {
        ...prevState,
        canDelete: !canDelete ? true : false,
        visible: canDelete ? false : true
      };
    });
  };

  const handleHide = () => {
    onDelete();
  };

  const handleCopyUrl = url => {
    copyToClipboard(url);
    setCopied(true);
  };

  const timeAgo = formatDistanceToNow(Date.parse(updateDate), {
    addSuffix: false,
    includeSeconds: false
  });

  const url = `${process.env.REACT_APP_GAME_BASE_URL}/match/${matchId}`;

  return (
    <Transition
      animation="fade"
      duration={1000}
      onHide={handleHide}
      visible={visible}
    >
      <Card className="match-card" key={matchId} raised>
        <Card.Content
          className={`card-header${canDelete ? ' can-delete' : ''}`}
        >
          <Button
            as="button"
            disabled={!visible}
            icon="trash"
            onClick={handleDelete}
            onMouseLeave={handleMouseLeave}
            type="button"
          />
          <div className="card-details">
            <Card.Header>{title}</Card.Header>
            <Card.Description>
              <Label icon="book">{termCount} Terms</Label>
              <Label icon="clock">{timeAgo}</Label>
            </Card.Description>
          </div>
          <div className="card-badge">
            <CircleBadge icon="question" />
          </div>
        </Card.Content>
        <Card.Content className="card-buttons" extra>
          <div className="ui four buttons">
            <RouterButton
              active
              disabled={!visible}
              icon="edit"
              pathname="/match/edit"
              state={{ matchId: matchId }}
            />
            <RouterButton
              active
              disabled={!visible}
              icon="bar-chart-2"
              pathname="/match/stats"
              state={{ matchId: matchId }}
            />
            <Button
              active
              as="a"
              disabled={!visible}
              href={url}
              icon="play"
              target="_blank"
              type="button"
            />
            <Button
              active
              as="button"
              className={`clipboard${copied ? ' copied' : ''}`}
              disabled={!visible}
              icon={!copied ? 'link' : 'copy'}
              onClick={() => handleCopyUrl(url)}
              title="Copy URL to clipboard"
              type="button"
            />
          </div>
        </Card.Content>
      </Card>
    </Transition>
  );
};

MatchCard.propTypes = {
  game: PropTypes.any.isRequired,
  onDelete: PropTypes.func.isRequired
};

const CircleBadge = ({ icon, size }) => {
  return (
    <div className="circle-badge">
      <Icon name={icon} />
    </div>
  );
};
