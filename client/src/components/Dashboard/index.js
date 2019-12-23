import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, List, Image } from 'semantic-ui-react';
import { useAPI, useData, useMessage, useReduxData } from '../../hooks/';
import { Icon, Loader, Notify } from '../UI/';
import Match from './Match';

/* Array of objects containing game Component metadata */
const games = [
  {
    name: 'MATCH',
    title: 'Match',
    credits: 1,
    icon: 'question',
    render: props => <Match {...props} />,
    collectionUrl: '/api/matches',
    singleUrl: '/api/match'
  },
  {
    name: 'TEST',
    title: 'test',
    credits: 5,
    icon: 'question',
    render: props => <div>{JSON.stringify(props, null, 4)}</div>,
    collectionUrl: '/api/payments',
    singleUrl: '/api/payment'
  }
];

const DEFAULT_GAME = 'MATCH';

const Dashboard = props => {
  const { location: { state: { from, skipAuth = false } = {} } = {} } = props;

  const activeGameIdx =
    games.findIndex(game => game.name === from) !== -1
      ? games.findIndex(game => game.name === from)
      : games.findIndex(game => game.name === DEFAULT_GAME);

  // local state - track menu, dirty toggle, and whether to fetch auth (or not)
  const [state, setState] = useState({
    activeGameIdx,
    dirty: false,
    skipAuth
  });

  // handles show/dismiss of redirect messages
  const [message, dismissMessage] = useMessage({ props });

  // Redux data
  const fetchItems = [...(!skipAuth ? ['fetchAuth'] : [])];
  useReduxData({ items: fetchItems, deps: [] });

  // direct API interactions (ephemeral)
  const { DELETE: deleteGame } = useAPI({
    url: games[state.activeGameIdx].singleUrl,
    debug: false
  });

  const { data, error, initialized, loading, reset } = useData({
    url: games[state.activeGameIdx].collectionUrl,
    deps: [state.activeGameIdx, state.dirty],
    debug: false
  });

  const handleMenuChange = menuIdx => {
    const { activeGameIdx } = state; // Current game index
    const switching = activeGameIdx !== menuIdx;
    switching && reset();
    setState(prevState => {
      return {
        ...prevState,
        activeGameIdx: switching ? menuIdx : activeGameIdx
      };
    });
  };

  const handleGameDelete = async id => {
    const results = await deleteGame(id);
    results.data &&
      setState(prevState => {
        return {
          ...prevState,
          dirty: !prevState.dirty // toggle dirty (for api refresh)
        };
      });
  };

  const renderMenu = (options, activeGameIdx) => {
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
                onClick={() => handleMenuChange(idx)}
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

  const showLoader = !initialized && (loading || !data);

  return (
    <Container as="main" className="page large" id="dashboard" fluid>
      <div className="content-wrapper">
        {renderMenu(games, state.activeGameIdx)}
        {message && Notify({ ...message, onDismiss: () => dismissMessage() })}
        {(showLoader && <Loader />) ||
          games[state.activeGameIdx].render({
            ...props,
            data,
            error,
            loading,
            onDelete: id => handleGameDelete(id)
          })}
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  credits: PropTypes.number.isRequired
};

export default Dashboard;
