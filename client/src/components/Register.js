import React, { useEffect } from 'react';
import { fetchStates, fetchCountries } from '../actions/';
import { useActions } from '../hooks/';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

export default props => {
  /**
   *  Remap object array keys
   *
   *  Needed because dropdowns want information in common, generic format
   *
   *  stateCode = key
   *  stateCode = value
   *  stateName = text
   **/
  const stateSelector = createSelector(
    state => state.states,
    states => {
      const data =
        states.data &&
        states.data.reduce((acc, state) => {
          acc.push({
            key: state.stateCode,
            value: state.stateCode,
            text: state.stateName
          });
          return acc;
        }, []);
      return { ...states, data };
    }
  );

  /**
   *  Remap object array keys
   *
   *  Needed because dropdowns want information in common, generic format
   *
   *  countryId = key
   *  countryCode = value
   *  countryName = text
   **/
  const countrySelector = createSelector(
    state => state.countries,
    countries => {
      const data =
        countries.data &&
        countries.data.reduce((acc, country) => {
          acc.push({
            key: country.countryId,
            value: country.countryCode,
            text: country.countryName
          });
          return acc;
        }, []);
      return { ...countries, data };
    }
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
