import React, { useState } from 'react';
import { Container, List, Image } from 'semantic-ui-react';
import { useAPI, useData, useMessage, useReduxData } from '../../hooks/';
import { Icon, Notify } from '../UI/';
import Match from './Match';

/* Array of objects containing game Component metadata */
const games = [
  {
    name: 'MATCH',
    title: 'Match',
    credits: 1,
    icon: 'question',
    action: 'fetchMatches',
    render: props => <Match {...props} />,
    url: '/api/matches'
  },
  {
    name: 'TEST',
    title: 'test',
    credits: 5,
    icon: 'question',
    action: 'fetchCountries',
    render: props => <div>{JSON.stringify(props, null, 4)}</div>,
    url: '/api/payments'
  }
];

const DEFAULT_GAME = 'MATCH';

export default props => {
  const { location: { state: { from, skipAuth = false } = {} } = {} } = props;

  const activeGameIdx =
    games.findIndex(game => game.name === from) !== -1
      ? games.findIndex(game => game.name === from)
      : games.findIndex(game => game.name === DEFAULT_GAME);

  // local state - track loading and API response
  const [state, setState] = useState({
    activeGameIdx,
    dirty: false,
    onSameTab: true,
    skipAuth
  });

  // handles show/dismiss of redirect messages
  const [message, dismissMessage] = useMessage({ props });

  // Redux data
  const fetchItems = [...(!skipAuth ? ['fetchAuth'] : [])];
  useReduxData({ items: fetchItems, deps: [] });

  // direct API interactions (ephemeral)
  const { DELETE: deleteGame } = useAPI({
    url: games[state.activeGameIdx].url,
    debug: true
  });

  const { data, error, getCount, loading, requests } = useData({
    url: games[state.activeGameIdx].url,
    deps: [state.onSameTab, state.dirty],
    debug: true
  });

  console.log(JSON.stringify(state, null, 4));

  const handleMenuChange = menuIdx => {
    const { activeGameIdx } = state; // Current game index
    const onSameTab = activeGameIdx === menuIdx ? true : false; // New game, i.e., current = target
    setState(prevState => {
      return {
        ...prevState,
        onSameTab,
        activeGameIdx: onSameTab ? activeGameIdx : menuIdx
      };
    });
  };

  const handleGameDelete = async id => {
    const results = await deleteGame(id);
    results.data &&
      setState(prevState => {
        return {
          ...prevState,
          dirty: !prevState.dirty
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

  return (
    <Container as="main" className="page large" id="dashboard" fluid>
      <div className="content-wrapper">
        {renderMenu(games, state.activeGameIdx)}
        {message && Notify({ ...message, onDismiss: () => dismissMessage() })}
        {games[state.activeGameIdx].render({
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
