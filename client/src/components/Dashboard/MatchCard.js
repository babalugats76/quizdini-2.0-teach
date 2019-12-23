import React, { useState, useEffect } from 'react';
import { Card, Transition } from 'semantic-ui-react';
import { copyToClipboard } from './utils';
import { Button, Label, RouterButton } from '../UI/';

const { formatDistanceToNow } = require('date-fns');

const MatchCard = props => {
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const copiedTimer =
      copied &&
      setTimeout(() => {
        setCopied(prevState => !prevState);
      }, 2000);
    return () => clearTimeout(copiedTimer);
  }, [copied]);

  const handleExit = event => {
    setVisible(prevState => !prevState);
  };

  const handleHide = event => {
    const { onMatchDelete } = props;
    onMatchDelete();
  };

  const handleCopyUrl = url => {
    copyToClipboard(url);
    setCopied(true);
  };

  const { matchId, title, updateDate, matches } = props.game;
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
        <Card.Content className="match-card-header">
          <Card.Header>{title}</Card.Header>
          <Button
            as="button"
            disabled={!visible}
            icon="trash"
            onClick={handleExit}
            title={`Delete ${title}`}
            type="button"
          />
        </Card.Content>
        <Card.Content className="match-card-desc">
          <Card.Description>
            <Label icon="book">{matches.length} Terms</Label>
            <Label icon="clock">{timeAgo}</Label>
          </Card.Description>
        </Card.Content>
        <Card.Content className="match-card-btns" extra>
          <div className="ui three buttons">
            <RouterButton
              active
              disabled={!visible}
              icon="edit"
              pathname="/match"
              state={{ matchId: matchId }}
              title={`Edit ${title}`}
            />
            <Button
              active
              as="a"
              disabled={!visible}
              href={url}
              icon="play"
              target="_blank"
              title={`Play ${title}`}
              type="button"
            />
            <Button
              active
              as="button"
              className={`clipboard ${copied ? 'copied' : ''}`}
              disabled={!visible}
              icon={!copied ? 'link' : null}
              onClick={() => handleCopyUrl(url)}
              title="Copy URL to clipboard"
              type="button"
            >
              {copied ? 'Copied!' : null}
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Transition>
  );
};

export default MatchCard;
