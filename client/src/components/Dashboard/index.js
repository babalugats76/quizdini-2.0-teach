import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container, List, Image } from 'semantic-ui-react';
import Message from '../UI/Message';
import Match from './Match';
import Icon from '../UI/Icon';

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
    const { fetchMatches, fetchAuth } = this.props; // Grab all Redux actions
    const { name: activeGame } = games[activeGameIdx]; // Name of current game
    switch (activeGame) {
      case 'MATCH':
        fetchAuth();
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

  handleMenuChange = menuIdx => {
    const { activeGameIdx } = this.state; // Current game index
    const onSameTab = activeGameIdx === menuIdx ? true : false; // New game, i.e., current = target
    this.setState((state, props) => {
      if (!onSameTab) {
        return { activeGameIdx: menuIdx }; // Update state (with new index)
      }
    });
    if (!onSameTab) {
      this.refreshData(menuIdx); // Refresh game's data
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
          id="dashboard-menu"
          link
          selection
          size="large"
          verticalAlign="top"
        >
          {options.map((option, idx) => {
            const { name, title, icon, credits } = option;
            return (
              <List.Item
                key={name}
                active={activeGameIdx === idx}
                onClick={() => this.handleMenuChange(idx)}
              >
                <Image>
                  <Icon name={icon} />
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
      <Container as="main" className="page large" id="dashboard" fluid>
        <div className="content-wrapper">
          {this.renderMenu(games, activeGameIdx)}
          {message && this.renderMessage(message)}
          {games[activeGameIdx].render({
            ...this.props,
            onMatchDelete: matchId => this.handleMatchDelete(matchId)
          })}
        </div>
      </Container>
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
