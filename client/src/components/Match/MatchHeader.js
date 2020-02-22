import React from 'react';
import PropTypes from 'prop-types';
import { Header, Label } from 'semantic-ui-react';
import { Icon } from '../UI/';

const MatchHeader = ({ content, duration, itemsPerBoard, size, termCount }) => {
  return (
    <div className="match-header">
      <Icon name="question" />
      <Header className="game-title" size={size}>
        {content}
      </Header>
      <Label.Group size={size}>
        <MatchLabel icon="book">{termCount} terms</MatchLabel>
        <MatchLabel icon="grid">{itemsPerBoard} per board</MatchLabel>
        <MatchLabel icon="watch">{duration} seconds</MatchLabel>
      </Label.Group>
    </div>
  );
};

MatchHeader.propTypes = {
  content: PropTypes.any.isRequired,
  duration: PropTypes.number.isRequired,
  itemsPerBoard: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  termCount: PropTypes.number.isRequired,
};

MatchHeader.defaultProps = {
  size: 'large'
};

export default MatchHeader;

const MatchLabel = ({ children, icon, ...rest }) => {
  return (
    <Label as="span" {...rest}>
      <Icon name={icon} />
      <Label.Detail as="span">{children}</Label.Detail>
    </Label>
  );
};

MatchLabel.propTypes = {
  children: PropTypes.any.isRequired,
  icon: PropTypes.string.isRequired
};
