import React, { useEffect } from 'react';
import { fetchStates, fetchCountries } from '../actions/';
import { useActions } from '../hooks/';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// TODO move transform for state and country into selector and out of reducer

export default props => {
  const stateSelector = createSelector(
    state => state.stateOptions,
    stateOptions => stateOptions
  );

  const countrySelector = createSelector(
    state => state.countryOptions,
    countryOptions => countryOptions
  );

  const states = useSelector(stateSelector);
  const countries = useSelector(countrySelector);
  const getStates = useActions(fetchStates);
  const getCountries = useActions(fetchCountries);

  useEffect(() => {
    if (!states.data) getStates();
    if (!countries.data) getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ul>
      <li>States: {states.data && Object.keys(states.data).length}</li>
      <li>Countries: {countries.data && Object.keys(countries.data).length}</li>
    </ul>
  );
};
