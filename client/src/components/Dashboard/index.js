import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, List } from 'semantic-ui-react';
import { useAPI, useData, useMessage } from '../../hooks/';
import { Badge, ErrorMessage, Loader, Notify } from '../UI/';
import Match from './Match';

/***
 * To add additional games:
 * Create new component (using Match as model)
 * Once complete, add to Dashboard submenu by adding object to games array; for example:
 * {
 *  name: "NEXT_GAME",
 *  title: "Next Game",
 *  credits: 1,
 *  icon: "next-game",
 *  render: props => <NextGame {...props} />
 *  collectionUrl: "/api/next-games",
 *  singleUrl: "/api/next-game"
 * }
 */

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
  }
];

const DEFAULT_GAME = 'MATCH';

const Dashboard = props => {
  const { location: { state: { from } = {} } = {} } = props;

  const activeGameIdx =
    games.findIndex(game => game.name === from) !== -1
      ? games.findIndex(game => game.name === from)
      : games.findIndex(game => game.name === DEFAULT_GAME);

  // local state - track menu, dirty toggle (for transitioning)
  const [state, setState] = useState({
    activeGameIdx,
    dirty: false
  });

  // handles show/dismiss of redirect messages
  const [message, dismissMessage] = useMessage(props);

  /* 
  useEffect(() => {
     console.log(JSON.stringify(state, null, 4));
  }, [state]); */

  // direct API interactions (ephemeral)
  const { DELETE: deleteGame } = useAPI({
    url: games[state.activeGameIdx].singleUrl
  });

  const { data, error, initialized, loading, reset } = useData({
    url: games[state.activeGameIdx].collectionUrl,
    deps: [state.activeGameIdx, state.dirty]
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
          as="section"
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
                <Badge icon={icon} />
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
    <Container className="page extra-large" fluid id="dashboard">
      <div className="content-wrapper"> {/* Provides for additional side padding, etc. */}
        {renderMenu(games, state.activeGameIdx)}
        {message && <Notify {...message} onDismiss={() => dismissMessage()} />}
        {(error && <ErrorMessage details={error} />) ||
          (showLoader && <Loader />) ||
          games[state.activeGameIdx].render({
            ...props, // including credits
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
