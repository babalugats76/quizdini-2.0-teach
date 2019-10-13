import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Segment, List, Image, Divider } from 'semantic-ui-react';
import Message from '../UI/Message';
import RouterButton from '../UI/RouterButton';
import MatchList from './MatchList';
import logo from '../../logo.svg';
import SVG from '../UI/SVG';

const Match = ({ credits, matchList, onMatchDelete }) => (
  <div id="match-game">
    <RouterButton
      disabled={credits <= 0}
      labelPosition="left"
      icon="plus"
      pathname="/match"
      positive={credits >= 1}
      state={{ matchId: null }}
      title="Create a new match game"
    >
      NEW GAME
    </RouterButton>
    <Divider hidden />
    <MatchList {...matchList} onMatchDelete={onMatchDelete} />
  </div>
);

/* Array of objects containing game Component metadata */
const games = [
  {
    name: 'MATCH',
    title: 'Match',
    credits: 1,
    icon: 'question',
    render: props => <Match {...props} />
  }
];

class Dashboard extends Component {
  static DEFAULT_GAME = 'MATCH';

  constructor(props) {
    super(props);
    const {
      location: { state: { message, from } = {} } = {},
      history
    } = this.props;

    const activeGameIdx =
      games.findIndex(game => game.name === from) !== -1
        ? games.findIndex(game => game.name === from)
        : games.findIndex(game => game.name === Dashboard.DEFAULT_GAME);

    this.state = {
      activeGameIdx,
      message
    };
    history.replace({ pathname: '/dashboard', state: {} });
  }

  /**
   * Conditionally update data using Redux actions
   * Need to map functions manually
   *
   * @param {string} activeGameIdx Index of active game
   */
  refreshData(activeGameIdx) {
    const { fetchMatches } = this.props; // Grab all Redux actions
    const { name: activeGame } = games[activeGameIdx]; // Name of current game
    switch (activeGame) {
      case 'MATCH':
        return fetchMatches();
      default:
        return;
    }
  }

  componentDidMount() {
    const { activeGameIdx } = this.state; // Index of current game
    this.refreshData(activeGameIdx); // Refresh data
  }

  handleDismiss = e => {
    e.preventDefault();
    this.setState((state, props) => {
      return {
        message: null
      };
    });
  };

  renderMessage = ({ header, content, color }) => {
    return (
      <Message
        color={color}
        content={content}
        header={header}
        hidden={!content}
        onDismiss={e => this.handleDismiss(e)}
      />
    );
  };

  handleMenuChange = (e, index) => {
    e.preventDefault();
    const { activeGameIdx } = this.state; // Current game index
    const onSameTab = activeGameIdx === index ? true : false; // New game, i.e., current = target
    this.setState((state, props) => {
      if (!onSameTab) {
        return { activeGameIdx: index }; // Update state (with new index)
      }
    });
    if (!onSameTab) {
      this.refreshData(index); // Refresh game's data
    }
  };

  handleMatchDelete = async matchId => {
    const { removeMatch, fetchMatches } = this.props;
    await removeMatch(matchId);
    await fetchMatches();
  };

  renderMenu = (options, activeGameIdx) => {
    return (
      options && (
        <List
          className="icon-menu-list"
          horizontal
          link
          selection
          size="big"
          verticalAlign="top"
        >
          {options.map((option, idx) => {
            const { name, title, icon, credits } = option;
            return (
              <List.Item
                key={name}
                active={activeGameIdx === idx}
                onClick={(e, index) => this.handleMenuChange(e, idx)}
              >
                <Image avatar>
                  <SVG name={icon} />
                </Image>
                <List.Content>
                  <List.Header>{title}</List.Header>
                  {credits} credit{credits === 1 ? '' : 's'}
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      )
    );
  };

  render() {
    const { activeGameIdx, message } = this.state;

    return (
      <div id="dashboard">
        {this.renderMenu(games, activeGameIdx)}
        <Segment className="content-wrapper" padded="very">
          {message && this.renderMessage(message)}
          {games[activeGameIdx].render({
            ...this.props,
            onMatchDelete: matchId => this.handleMatchDelete(matchId)
          })}
        </Segment>
      </div>
    );
  }
}

Dashboard.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  credits: PropTypes.number.isRequired
};

const mapStateToProps = ({ matchList }) => ({ matchList });

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
