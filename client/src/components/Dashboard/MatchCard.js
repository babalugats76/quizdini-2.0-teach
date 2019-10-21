import React, { Component } from 'react';
import { Card, Transition } from 'semantic-ui-react';
import { copyToClipboard } from './utils';
import { Button } from '../UI/Button';
import { Label } from '../UI/Label';
import RouterButton from '../UI/RouterButton';

const { formatDistanceToNow } = require('date-fns');

class MatchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      copied: false
    };
  }

  handleExit = event => {
    this.setState((state, props) => {
      return { visible: !state.visible };
    });
  };

  handleHide = event => {
    const { onMatchDelete } = this.props;
    onMatchDelete();
  };

  handleCopyUrl = (event, url) => {
    event.preventDefault();
    copyToClipboard(url);
    this.setState((state, props) => {
      return { copied: true };
    });
    setTimeout(() => {
      this.setState((state, props) => {
        return { copied: false };
      });
    }, 2000);
  };

  render() {
    const { matchId, title, updateDate, matches } = this.props.game;
    const { visible, copied } = this.state;
    const timeAgo = formatDistanceToNow(Date.parse(updateDate), {
      addSuffix: false,
      includeSeconds: false
    });
    const url = `${process.env.REACT_APP_GAME_BASE_URL}/match/${matchId}`;

    return (
      <Transition
        animation="fade"
        duration={1000}
        onHide={this.handleHide}
        visible={visible}
      >
        <Card className="match-card" horizontal key={matchId} raised>
          <Card.Content className="match-card-header">
            <Card.Header>{title}</Card.Header>
            <Button
              as="button"
              disabled={!visible}
              icon="trash"
              onClick={this.handleExit}
              title={`Delete ${title}`}
              type="button"
            />
          </Card.Content>
          <Card.Content className="match-card-desc">
            <Card.Description>
              <Label icon="archive">{matches.length} Terms</Label>
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
                onClick={(event, text) => this.handleCopyUrl(event, url)}
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
  }
}

export default MatchCard;
