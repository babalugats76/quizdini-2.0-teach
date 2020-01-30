import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import MatchEdit from "./MatchEdit";
import MatchStats from "./MatchStats";

// Match subroutes ( order is important )
const routes = [
  {
    path: "edit",
    exact: true,
    component: MatchEdit,
    id: "edit"
  },
  {
    path: "stats",
    exact: true,
    component: MatchStats,
    id: "stats"
  },
  {
    path: "",
    exact: false,
    component: MatchEdit,
    id: "default"
  }
];

const index = props => {

  const { match: { path: basePath } = {} } = props; // grab basePath from `match`

  return (
    <Switch>
      {routes.map(({ path, exact, component: Component, id }) => {
        return (
          <Route
            key={id}
            path={`${basePath}/${path}`}
            exact={exact}
            render={() => <Component {...props} />}
          />
        );
      })}
    </Switch>
  );
};

index.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default index;
